// Helper function: cleans FASTA headers and invalid characters
function cleanSequence(raw) {
    return raw
        .replace(/>.*\n?/g, "")  // remove FASTA header
        .toUpperCase()
        .replace(/[^ATGC]/g, ""); // keep only valid DNA bases
}
const codonTable = {
    "UUU":"Phe","UUC":"Phe","UUA":"Leu","UUG":"Leu",
    "UCU":"Ser","UCC":"Ser","UCA":"Ser","UCG":"Ser",
    "UAU":"Tyr","UAC":"Tyr","UAA":"STOP","UAG":"STOP",
    "UGU":"Cys","UGC":"Cys","UGA":"STOP","UGG":"Trp",

    "CUU":"Leu","CUC":"Leu","CUA":"Leu","CUG":"Leu",
    "CCU":"Pro","CCC":"Pro","CCA":"Pro","CCG":"Pro",
    "CAU":"His","CAC":"His","CAA":"Gln","CAG":"Gln",
    "CGU":"Arg","CGC":"Arg","CGA":"Arg","CGG":"Arg",

    "AUU":"Ile","AUC":"Ile","AUA":"Ile","AUG":"Met",
    "ACU":"Thr","ACC":"Thr","ACA":"Thr","ACG":"Thr",
    "AAU":"Asn","AAC":"Asn","AAA":"Lys","AAG":"Lys",
    "AGU":"Ser","AGC":"Ser","AGA":"Arg","AGG":"Arg",

    "GUU":"Val","GUC":"Val","GUA":"Val","GUG":"Val",
    "GCU":"Ala","GCC":"Ala","GCA":"Ala","GCG":"Ala",
    "GAU":"Asp","GAC":"Asp","GAA":"Glu","GAG":"Glu",
    "GGU":"Gly","GGC":"Gly","GGA":"Gly","GGG":"Gly"
};

function validateDNA(raw) {
    // remove FASTA header but keep original letters
      let seq = raw.replace(/^>.*\n?/g, "").toUpperCase().trim();

    if (!seq || seq.length === 0) {
        document.getElementById("outputBox").innerText =
            "Error: No DNA sequence detected. Please enter A, T, G, C bases.";
        return false;
    }

    // warn if invalid bases exist (but still allow processing)
    if (/[^ATGC]/.test(seq)) {
        document.getElementById("outputBox").innerText =
            "Warning: Invalid characters detected. They will be ignored.";
        return true;
    }

    return true;
}


// GC Content Calculator
function calculateGC() {
    let raw = document.getElementById("dnaInput").value;

// Check invalid bases BEFORE cleaning
let seqOnly = raw.replace(/^>.*\n?/g, "").toUpperCase();
if (/[^ATGC]/.test(seqOnly)) {
    document.getElementById("outputBox").innerText =
        "Error: Invalid characters detected. Only A, T, G, C are allowed.";
    return;
}

// Now clean and validate
let dna = cleanSequence(raw);
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
function reverseComplementDNA() {
    let raw = document.getElementById("dnaInput").value;

    // check invalid bases BEFORE cleaning
    let seqOnly = raw.replace(/^>.*\n?/g, "").toUpperCase();
    if (/[^ATGC]/.test(seqOnly)) {
        document.getElementById("outputBox").innerText =
            "Error: Invalid characters detected. Only A, T, G, C are allowed.";
        return;
    }

    let dna = cleanSequence(raw);

    const complement = { A: "T", T: "A", G: "C", C: "G" };

    let rev = dna
        .split("")
        .reverse()
        .map(base => complement[base] || "N")
        .join("");

    document.getElementById("outputBox").innerText =
        "Reverse Complement:\n" + rev;
}

// DNA to RNA Transcription
function transcribeDNA() {
    let raw = document.getElementById("dnaInput").value;

// Check invalid bases BEFORE cleaning
let seqOnly = raw.replace(/^>.*\n?/g, "").toUpperCase();
if (/[^ATGC]/.test(seqOnly)) {
    document.getElementById("outputBox").innerText =
        "Error: Invalid characters detected. Only A, T, G, C are allowed.";
    return;
}

// Now clean and validate
let dna = cleanSequence(raw);
if (!validateDNA(dna)) return;

    let rna = dna.replace(/T/g, "U");

    document.getElementById("outputBox").innerText =
        "RNA Sequence:\n" + rna;
}

// PCR Primer Designer
function designPrimers() {
    let raw = document.getElementById("dnaInput").value;

// Check invalid bases BEFORE cleaning
let seqOnly = raw.replace(/^>.*\n?/g, "").toUpperCase();
if (/[^ATGC]/.test(seqOnly)) {
    document.getElementById("outputBox").innerText =
        "Error: Invalid characters detected. Only A, T, G, C are allowed.";
    return;
}

// Now clean and validate
let dna = cleanSequence(raw);
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
    let raw = document.getElementById("dnaInput").value;

// Check invalid bases BEFORE cleaning
let seqOnly = raw.replace(/^>.*\n?/g, "").toUpperCase();
if (/[^ATGC]/.test(seqOnly)) {
    document.getElementById("outputBox").innerText =
        "Error: Invalid characters detected. Only A, T, G, C are allowed.";
    return;
}

// Now clean and validate
let dna = cleanSequence(raw);
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
    let raw = document.getElementById("dnaInput").value;

// Check invalid bases BEFORE cleaning
let seqOnly = raw.replace(/^>.*\n?/g, "").toUpperCase();
if (/[^ATGC]/.test(seqOnly)) {
    document.getElementById("outputBox").innerText =
        "Error: Invalid characters detected. Only A, T, G, C are allowed.";
    return;
}

// Now clean and validate
let dna = cleanSequence(raw);
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
    let raw = document.getElementById("dnaInput").value;

// Check invalid bases BEFORE cleaning
let seqOnly = raw.replace(/^>.*\n?/g, "").toUpperCase();
if (/[^ATGC]/.test(seqOnly)) {
    document.getElementById("outputBox").innerText =
        "Error: Invalid characters detected. Only A, T, G, C are allowed.";
    return;
}

// Now clean and validate
let dna = cleanSequence(raw);
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
function translateProtein() {
    let raw = document.getElementById("dnaInput").value;

    // Validate raw input
    let seqOnly = raw.replace(/^>.*\n?/g, "").toUpperCase();
    if (/[^ATGC]/.test(seqOnly)) {
        document.getElementById("outputBox").innerText =
            "Error: Invalid characters detected. Only A, T, G, C are allowed.";
        return;
    }

    // Clean sequence
    let dna = cleanSequence(raw);

    // Transcribe DNA → RNA
    let rna = dna.replace(/T/g, "U");

    // Translate codons
    let protein = [];
    for (let i = 0; i < rna.length; i += 3) {
        let codon = rna.substring(i, i + 3);
        if (codon.length < 3) break;

        let aminoAcid = codonTable[codon] || "?";
        if (aminoAcid === "STOP") break;

        protein.push(aminoAcid);
    }

    document.getElementById("outputBox").innerText =
        "RNA Sequence:\n" + rna +
        "\n\nProtein Sequence:\n" + protein.join("-");
}
function translateFrames() {
    let dna = cleanSequence(document.getElementById("dnaInput").value);
    if (!validateDNA(dna)) return;

    // genetic code (3-letter)
    const codonTable = {
        "TTT":"Phe","TTC":"Phe","TTA":"Leu","TTG":"Leu",
        "CTT":"Leu","CTC":"Leu","CTA":"Leu","CTG":"Leu",
        "ATT":"Ile","ATC":"Ile","ATA":"Ile","ATG":"Met",
        "GTT":"Val","GTC":"Val","GTA":"Val","GTG":"Val",

        "TCT":"Ser","TCC":"Ser","TCA":"Ser","TCG":"Ser",
        "CCT":"Pro","CCC":"Pro","CCA":"Pro","CCG":"Pro",
        "ACT":"Thr","ACC":"Thr","ACA":"Thr","ACG":"Thr",
        "GCT":"Ala","GCC":"Ala","GCA":"Ala","GCG":"Ala",

        "TAT":"Tyr","TAC":"Tyr","TAA":"Stop","TAG":"Stop",
        "CAT":"His","CAC":"His","CAA":"Gln","CAG":"Gln",
        "AAT":"Asn","AAC":"Asn","AAA":"Lys","AAG":"Lys",
        "GAT":"Asp","GAC":"Asp","GAA":"Glu","GAG":"Glu",

        "TGT":"Cys","TGC":"Cys","TGA":"Stop","TGG":"Trp",
        "CGT":"Arg","CGC":"Arg","CGA":"Arg","CGG":"Arg",
        "AGT":"Ser","AGC":"Ser","AGA":"Arg","AGG":"Arg",
        "GGT":"Gly","GGC":"Gly","GGA":"Gly","GGG":"Gly"
    };

    function translate(seq) {
        let protein = "";
        for (let i = 0; i <= seq.length - 3; i += 3) {
            let codon = seq.substring(i, i + 3);
            protein += (codonTable[codon] || "???") + " ";
        }
        return protein.trim();
    }

    let frame1 = translate(dna);
    let frame2 = translate(dna.substring(1));
    let frame3 = translate(dna.substring(2));

    document.getElementById("outputBox").innerText =
        "Frame +1:\n" + frame1 + "\n\n" +
        "Frame +2:\n" + frame2 + "\n\n" +
        "Frame +3:\n" + frame3;
}

function findORFs() {
    let raw = document.getElementById("dnaInput").value;

    // Validate input
    let seqOnly = raw.replace(/^>.*\n?/g, "").toUpperCase();
    if (/[^ATGC]/.test(seqOnly)) {
        document.getElementById("outputBox").innerText =
            "Error: Invalid characters detected. Only A, T, G, C are allowed.";
        return;
    }

    let dna = cleanSequence(raw);
    let orfs = [];

    for (let i = 0; i < dna.length - 2; i++) {
        if (dna.substring(i, i + 3) === "ATG") {
            for (let j = i + 3; j < dna.length - 2; j += 3) {
                let codon = dna.substring(j, j + 3);
                if (["TAA", "TAG", "TGA"].includes(codon)) {
                    let orfSeq = dna.substring(i, j + 3);
                    orfs.push(orfSeq);
                    break;
                }
            }
        }
    }

    if (orfs.length === 0) {
        document.getElementById("outputBox").innerText =
            "No ORFs detected in the sequence.";
        return;
    }

    // Translate each ORF
    let output = "";
    orfs.forEach((orf, index) => {
        let rna = orf.replace(/T/g, "U");
        let protein = [];

        for (let k = 0; k < rna.length; k += 3) {
            let codon = rna.substring(k, k + 3);
            if (codon.length < 3) break;

            let aa = codonTable[codon];
            if (aa === "STOP") break;

            protein.push(aa);
        }

        output += `ORF ${index + 1}: ${orf} (Length: ${orf.length} bp)\n`;
        output += `Protein: ${protein.join("-")}\n\n`;
    });

    document.getElementById("outputBox").innerText = output;
}
function downloadOutput() {
    let content = document.getElementById("outputBox").innerText;

    if (!content || content.trim() === "") {
        alert("No output to download!");
        return;
    }

    let blob = new Blob([content], { type: "text/plain" });
    let url = URL.createObjectURL(blob);

    let a = document.createElement("a");
    a.href = url;
    a.download = "biolab_toolkit_results.txt";
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);

    URL.revokeObjectURL(url);
}
function runFullAnalysis() {
    let raw = document.getElementById("dnaInput").value;

    // Validate input
    let seqOnly = raw.replace(/^>.*\n?/g, "").toUpperCase();
    if (/[^ATGC]/.test(seqOnly)) {
        document.getElementById("outputBox").innerText =
            "Error: Invalid characters detected. Only A, T, G, C are allowed.";
        return;
    }

    let dna = cleanSequence(raw);
    if (dna.length === 0) {
        document.getElementById("outputBox").innerText =
            "Error: No valid DNA sequence detected.";
        return;
    }

    let report = "BioLab Toolkit – Full Sequence Analysis Report\n";
    report += "--------------------------------------------------\n\n";

    // 1. Sequence Stats
    report += "Sequence Length: " + dna.length + " bp\n\n";

    // 2. GC Content
    let gcCount = (dna.match(/[GC]/g) || []).length;
    let gcPercent = ((gcCount / dna.length) * 100).toFixed(2);

    report += "GC Content: " + gcPercent + "%\n";
    if (gcPercent < 40) {
        report += "Interpretation: Low GC content; may reduce thermal stability.\n\n";
    } else if (gcPercent > 60) {
        report += "Interpretation: High GC content; increased thermal stability expected.\n\n";
    } else {
        report += "Interpretation: Moderate GC content; suitable for standard PCR conditions.\n\n";
    }

    // 3. ORF Detection
    let orfs = [];
    for (let i = 0; i < dna.length - 2; i++) {
        if (dna.substring(i, i + 3) === "ATG") {
            for (let j = i + 3; j < dna.length - 2; j += 3) {
                let codon = dna.substring(j, j + 3);
                if (["TAA", "TAG", "TGA"].includes(codon)) {
                    let orfSeq = dna.substring(i, j + 3);
                    orfs.push(orfSeq);
                    break;
                }
            }
        }
    }

    if (orfs.length === 0) {
        report += "ORF Analysis: No valid open reading frames detected.\n\n";
    } else {
        report += "ORF Analysis:\n";
        orfs.forEach((orf, index) => {
            report += `  ORF ${index + 1}: Length ${orf.length} bp\n`;
        });
        report += "\n";
    }

    // 4. Translation (first ORF only)
    if (orfs.length > 0) {
        let firstORF = orfs[0];
        let rna = firstORF.replace(/T/g, "U");

        let protein = [];
        for (let i = 0; i < rna.length; i += 3) {
            let codon = rna.substring(i, i + 3);
            if (codon.length < 3) break;

            let aa = codonTable[codon];
            if (aa === "STOP") break;

            protein.push(aa);
        }

        report += "Predicted Protein (from first ORF):\n";
        report += protein.join("-") + "\n\n";
        report += "Interpretation: Sequence likely encodes a protein-coding region.\n";
    }

    document.getElementById("outputBox").innerText = report;
}

function translateSixFrames() {
    let raw = document.getElementById("dnaInput").value;
    if (!validateDNA(raw)) return;
    let dna = cleanSequence(raw);

    function reverseComplement(seq) {
        return seq.replace(/A/g, "t")
                  .replace(/T/g, "a")
                  .replace(/G/g, "c")
                  .replace(/C/g, "g")
                  .toUpperCase()
                  .split("")
                  .reverse()
                  .join("");
    }

    function translateFrame(seq, frame) {
        let rna = seq.replace(/T/g, "U");
        let protein = [];

        for (let i = frame; i < rna.length; i += 3) {
            let codon = rna.substring(i, i + 3);
            if (codon.length < 3) break;

            let aa = codonTable[codon] || "?";
            if (aa === "STOP") break;

            protein.push(aa);
        }
        return protein.join("-");
    }

    let revComp = reverseComplement(dna);

    let result = ""; 

    result += "Forward Strand Frames:\n";
    result += "+1: " + translateFrame(dna, 0) + "\n";
    result += "+2: " + translateFrame(dna, 1) + "\n";
    result += "+3: " + translateFrame(dna, 2) + "\n\n";

    result += "Reverse Strand Frames:\n";
    result += "-1: " + translateFrame(revComp, 0) + "\n";
    result += "-2: " + translateFrame(revComp, 1) + "\n";
    result += "-3: " + translateFrame(revComp, 2);

    document.getElementById("outputBox").innerText = result;
}
function findLongestORF() {
    let raw = document.getElementById("dnaInput").value;
    if (!validateDNA(raw)) return;

    let dna = cleanSequence(raw); // ✅ MUST define dna here

    function scanORFs(seq, strandLabel) {
        if (!seq) return { length: 0, start: 0, end: 0, frame: 0, strand: strandLabel };

        let longest = { length: 0, start: 0, end: 0, frame: 0, strand: strandLabel };

        for (let frame = 0; frame < 3; frame++) {
            for (let i = frame; i < seq.length - 2; i += 3) {
                let codon = seq.substring(i, i + 3);

                if (codon === "ATG") {
                    for (let j = i + 3; j < seq.length - 2; j += 3) {
                        let stopCodon = seq.substring(j, j + 3);

                        if (["TAA", "TAG", "TGA"].includes(stopCodon)) {
                            let orfLength = j + 3 - i; // bp length

                            if (orfLength > longest.length) {
                                longest = {
                                    length: orfLength,
                                    start: i + 1, // 1-based indexing
                                    end: j + 3,
                                    frame: frame + 1,
                                    strand: strandLabel
                                };
                            }
                            break;
                        }
                    }
                }
            }
        }

        return longest;
    }

    let forwardResult = scanORFs(dna, "Forward");
    let revComp = reverseComplement(dna);
    let reverseResult = scanORFs(revComp, "Reverse");

    let best = forwardResult.length > reverseResult.length ? forwardResult : reverseResult;

    if (best.length === 0) {
        document.getElementById("outputBox").innerText =
            "No ORFs detected in any frame.";
        return;
    }

    let report = "Longest ORF Prediction:\n\n";
    report += `Strand: ${best.strand}\n`;
    report += `Frame: ${best.strand === "Forward" ? "+" : "-"}${best.frame}\n`;
    report += `Start Position: ${best.start}\n`;
    report += `End Position: ${best.end}\n`;
    report += `Length: ${best.length} bp\n\n`;
    report += "Interpretation: Sequence likely contains a protein-coding region.";

    document.getElementById("outputBox").innerText = report;
}


function codonUsageAnalysis() {
    let raw = document.getElementById("dnaInput").value;
    if (!validateDNA(raw)) return;
    let dna = cleanSequence(raw);

    let rna = dna.replace(/T/g, "U");

    let codonCounts = {};

    for (let i = 0; i < rna.length - 2; i += 3) {
        let codon = rna.substring(i, i + 3);
        if (codon.length < 3) break;

        if (!codonCounts[codon]) {
            codonCounts[codon] = 0;
        }
        codonCounts[codon]++;
    }

    let report = "Codon Usage Analysis:\n\n";

    for (let codon in codonCounts) {
        let aa = codonTable[codon] || "?";
        report += `${codon} (${aa}): ${codonCounts[codon]}\n`;
    }

    report += "\nInterpretation: Displays codon frequency, useful for studying codon bias and gene expression efficiency.";

    document.getElementById("outputBox").innerText = report;
}
let orfChartInstance = null;

function plotORFGraph(orfs) {
    if (!orfs || orfs.length === 0) return;

    let ctx = document.getElementById("orfChart").getContext("2d");

    let lengths = orfs.map(seq => seq.length / 3); // amino acid length

    if (orfChartInstance) {
        orfChartInstance.destroy();
    }

    orfChartInstance = new Chart(ctx, {
        type: "bar",
        data: {
            labels: lengths.map((_, i) => "ORF " + (i + 1)),
            datasets: [{
                label: "ORF Length (amino acids)",
                data: lengths
            }]
        },
        options: {
            responsive: true,
            plugins: {
                legend: { display: true }
            },
            scales: {
                y: {
                    beginAtZero: true,
                    title: {
                        display: true,
                        text: "Length (aa)"
                    }
                }
            }
        }
    });
}
// ===== Longest ORF + Auto Graph Plot (SAFE ADD-ON) =====

// fallback reverseComplement if missing
if (typeof reverseComplement !== "function") {
    function reverseComplement(seq) {
        const comp = { A: "T", T: "A", G: "C", C: "G" };
        return seq.split("").reverse().map(b => comp[b] || "N").join("");
    }
}

// global chart instance (avoid redeclare crash)
if (typeof orfChartInstance === "undefined") {
}

function autoPlotORFGraph(lengths) {
    if (!lengths || lengths.length === 0) return;

    const canvas = document.getElementById("orfChart");
    if (!canvas) return; // graph not on page

    const ctx = canvas.getContext("2d");

    if (orfChartInstance) {
        orfChartInstance.destroy();
    }

    orfChartInstance = new Chart(ctx, {
        type: "bar",
        data: {
            labels: lengths.map((_, i) => "ORF " + (i + 1)),
            datasets: [{
                label: "ORF Length (aa)",
                data: lengths
            }]
        },
        options: {
            responsive: true,
            scales: {
                y: { beginAtZero: true }
            }
        }
    });
}

window.findLongestORF = function () {
    let raw = document.getElementById("dnaInput").value;
    if (!validateDNA(raw)) return;

    let dna = cleanSequence(raw);
    if (!dna || dna.length < 3) {
        document.getElementById("outputBox").innerText = "Sequence too short.";
        return;
    }

    const stopCodons = ["TAA", "TAG", "TGA"];
    let orfLengths = [];

    function scan(seq, strandLabel) {
        let best = { length: 0, start: 0, end: 0, frame: 0, strand: strandLabel };

        for (let frame = 0; frame < 3; frame++) {
            for (let i = frame; i < seq.length - 2; i += 3) {
                if (seq.substring(i, i + 3) === "ATG") {
                    for (let j = i + 3; j < seq.length - 2; j += 3) {
                        let codon = seq.substring(j, j + 3);
                        if (stopCodons.includes(codon)) {
                            let lenAA = (j + 3 - i) / 3;
                            orfLengths.push(lenAA);

                            if (lenAA > best.length) {
                                best = {
                                    length: lenAA,
                                    start: i + 1,
                                    end: j + 3,
                                    frame: frame + 1,
                                    strand: strandLabel
                                };
                            }
                            break;
                        }
                    }
                }
            }
        }
        return best;
    }

    let forwardBest = scan(dna, "Forward");
    let reverseBest = scan(reverseComplement(dna), "Reverse");

    let best = forwardBest.length >= reverseBest.length ? forwardBest : reverseBest;

    if (best.length === 0) {
        document.getElementById("outputBox").innerText =
            "No ORFs detected in any frame.";
        return;
    }

    // update graph automatically
    autoPlotORFGraph(orfLengths);

    // output report
    let report = "Longest ORF Prediction:\n\n";
    report += `Strand: ${best.strand}\n`;
    report += `Frame: ${best.strand === "Forward" ? "+" : "-"}${best.frame}\n`;
    report += `Start Position: ${best.start}\n`;
    report += `End Position: ${best.end}\n`;
    report += `Length: ${best.length} aa\n\n`;
    report += "Interpretation: Sequence likely contains a protein-coding region.";

    document.getElementById("outputBox").innerText = report;
}
function exportPDF() {
    const element = document.getElementById("outputBox");

    if (!element || element.innerText.trim() === "") {
        alert("No analysis output to export!");
        return;
    }

    const opt = {
        margin: 0.5,
        filename: 'BioLab_Toolkit_Report.pdf',
        image: { type: 'jpeg', quality: 0.98 },
        html2canvas: { scale: 2 },
        jsPDF: { unit: 'in', format: 'a4', orientation: 'portrait' }
    };

    html2pdf().set(opt).from(element).save();
}
function exportPDF() {
    const element = document.getElementById("reportSection");

    if (!element) {
        alert("Nothing to export!");
        return;
    }

    const opt = {
        margin: 0.5,
        filename: 'BioLab_Toolkit_Report.pdf',
        image: { type: 'jpeg', quality: 0.98 },
        html2canvas: { scale: 2 },
        jsPDF: { unit: 'in', format: 'a4', orientation: 'portrait' }
    };

    html2pdf().set(opt).from(element).save();
}
function exportPDF() {
    const { jsPDF } = window.jspdf;
    let doc = new jsPDF();

    // Capture text output
    let outputText = document.getElementById("outputBox").innerText;
    doc.setFont("Times", "Normal");
    doc.setFontSize(12);

    doc.text("BioLab Toolkit – Analysis Report", 10, 15);
    doc.text(outputText || "No analysis results available.", 10, 25);

    // Capture chart if exists
    let chartCanvas = document.getElementById("orfChart");
    if (chartCanvas) {
        let imgData = chartCanvas.toDataURL("image/png");
        doc.addPage();
        doc.text("ORF Length Graph", 10, 15);
        doc.addImage(imgData, "PNG", 10, 25, 180, 100);
    }

    doc.save("BioLab_Toolkit_Report.pdf");
}
