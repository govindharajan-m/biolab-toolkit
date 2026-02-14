// Helper function: cleans FASTA headers and invalid characters
function cleanSequence(raw) {
    return raw
        .replace(/>.*\n?/g, "")  // remove FASTA header
        .toUpperCase()
        .replace(/[^ATGC]/g, ""); // keep only valid DNA bases
}
function validateDNA(dna) {
    if (!dna || dna.length === 0) {
        document.getElementById("outputBox").innerText =
            "Error: No valid DNA sequence detected. Please enter A, T, G, C bases.";
        return false;
    }
    return true;
}

// GC Content Calculator
function calculateGC() {
    let dna = cleanSequence(document.getElementById("dnaInput").value);
     if (!validateDNA(dna)) return;
    let g = 0;
    let c = 0;

    for (let base of dna) {
        if (base === 'G') g++;
        if (base === 'C') c++;
    }

    let gcContent = dna.length ? ((g + c) / dna.length) * 100 : 0;

    document.getElementById("outputBox").innerText =
        "GC Content: " + gcContent.toFixed(2) + "%";
}

// Reverse Complement
function reverseComplement() {
    let dna = cleanSequence(document.getElementById("dnaInput").value);
     if (!validateDNA(dna)) return;
    let complement = "";

    for (let base of dna) {
        if (base === 'A') complement += 'T';
        else if (base === 'T') complement += 'A';
        else if (base === 'G') complement += 'C';
        else if (base === 'C') complement += 'G';
    }

    let reverseComp = complement.split("").reverse().join("");

    document.getElementById("outputBox").innerText =
        "Reverse Complement:\n" + reverseComp;
}

// DNA to RNA Transcription
function transcribeDNA() {
    let dna = cleanSequence(document.getElementById("dnaInput").value);
     if (!validateDNA(dna)) return;
    let rna = dna.replace(/T/g, "U");

    document.getElementById("outputBox").innerText =
        "RNA Sequence:\n" + rna;
}

// PCR Primer Designer
function designPrimers() {
    let dna = cleanSequence(document.getElementById("dnaInput").value);
     if (!validateDNA(dna)) return;
    if (dna.length < 10) {
        document.getElementById("outputBox").innerText =
            "Sequence too short for primer design.";
        return;
    }

    let primerLength = dna.length < 18 ? dna.length : 18;

    let forwardPrimer = dna.substring(0, primerLength);

    let lastSegment = dna.substring(dna.length - primerLength);
    let complement = "";

    for (let base of lastSegment) {
        if (base === 'A') complement += 'T';
        else if (base === 'T') complement += 'A';
        else if (base === 'G') complement += 'C';
        else if (base === 'C') complement += 'G';
    }

    let reversePrimer = complement.split("").reverse().join("");

    let g = 0, c = 0, a = 0, t = 0;
    for (let base of forwardPrimer) {
        if (base === 'G') g++;
        if (base === 'C') c++;
        if (base === 'A') a++;
        if (base === 'T') t++;
    }

    let gcContent = ((g + c) / forwardPrimer.length) * 100;
    let tm = 2 * (a + t) + 4 * (g + c);

    document.getElementById("outputBox").innerText =
        "Forward Primer: " + forwardPrimer +
        "\nReverse Primer: " + reversePrimer +
        "\nGC Content: " + gcContent.toFixed(2) + "%" +
        "\nTm (approx): " + tm + " °C";
}

// Restriction Enzyme Digestion Simulator
function simulateDigestion() {
    let dna = cleanSequence(document.getElementById("dnaInput").value);
     if (!validateDNA(dna)) return;
    let enzymeSite = prompt("Enter restriction enzyme recognition sequence (e.g., GAATTC):");

    if (!enzymeSite) return;

    enzymeSite = enzymeSite.toUpperCase().replace(/[^ATGC]/g, "");
    let cutPositions = [];

    for (let i = 0; i <= dna.length - enzymeSite.length; i++) {
        let segment = dna.substring(i, i + enzymeSite.length);
        if (segment === enzymeSite) {
            cutPositions.push(i);
        }
    }

    if (cutPositions.length === 0) {
        document.getElementById("outputBox").innerText =
            "No restriction sites found.";
        return;
    }

    let fragments = [];
    let prevCut = 0;

    for (let pos of cutPositions) {
        fragments.push(pos - prevCut);
        prevCut = pos;
    }

    fragments.push(dna.length - prevCut);

    document.getElementById("outputBox").innerText =
        "Cut Sites Found: " + cutPositions.length +
        "\nFragment Sizes (bp): " + fragments.join(" | ");
}

// Sequence Statistics (Length + Base Composition)
function sequenceStats() {
    let dna = cleanSequence(document.getElementById("dnaInput").value);
     if (!validateDNA(dna)) return;
    let counts = {A:0, T:0, G:0, C:0};

    for (let base of dna) {
        counts[base]++;
    }

    document.getElementById("outputBox").innerText =
        "Sequence Length: " + dna.length + " bp\n" +
        "A: " + counts.A + "\n" +
        "T: " + counts.T + "\n" +
        "G: " + counts.G + "\n" +
        "C: " + counts.C;
}

// Mutation Simulator
function mutateSequence() {
    let dna = cleanSequence(document.getElementById("dnaInput").value);
     if (!validateDNA(dna)) return;

    let position = parseInt(prompt("Enter position to mutate (1-based index):"));
    let newBase = prompt("Enter new base (A/T/G/C):");

    if (!position || position < 1 || position > dna.length) {
        alert("Invalid position.");
        return;
    }

    newBase = newBase.toUpperCase();
    if (!['A','T','G','C'].includes(newBase)) {
        alert("Invalid base.");
        return;
    }

    let mutated =
        dna.substring(0, position-1) +
        newBase +
        dna.substring(position);

    document.getElementById("outputBox").innerText =
        "Original: " + dna + "\n\nMutated:  " + mutated;
}

