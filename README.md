BioLab Toolkit – DNA Sequence Analysis Web Application

BioLab Toolkit is a browser-based DNA sequence analysis platform developed for biotechnology and bioinformatics applications. It performs fundamental sequence analysis operations entirely on the client side using HTML, CSS, and JavaScript, without requiring any backend infrastructure or software installation. The tool is intended as an educational and demonstrative interface for understanding core computational biology workflows.

---------------------------------------------------------------------

Live Demo

https://govindharajan-m.github.io/biolab-toolkit/

---------------------------------------------------------------------

Key Features

Sequence Analysis
- GC content calculation
- Sequence length and nucleotide composition analysis
- Reverse complement generation
- DNA to RNA transcription
- Codon-based protein translation

ORF and Translation Tools
- Open Reading Frame (ORF) detection
- Three-frame translation
- Six-frame translation (forward and reverse strands)
- Longest ORF prediction with frame and strand identification
- Codon usage frequency analysis

Visualization and Reporting
- ORF length visualization using Chart.js
- Comprehensive sequence analysis summary
- Exportable analysis report in PDF format

---------------------------------------------------------------------

Technologies Used
- HTML5 for structure and interface
- CSS3 for layout and styling
- Vanilla JavaScript for sequence analysis algorithms
- Chart.js for graphical visualization of ORF lengths
- jsPDF for generation of downloadable analysis reports

---------------------------------------------------------------------

Project Structure

biolab-toolkit/
│── index.html        Main user interface and layout
│── style.css         Styling and visual design
│── script.js         Core sequence analysis logic and algorithms
│── README.md         Project documentation

---------------------------------------------------------------------

Running the Application Locally

1. Clone the repository:
   git clone https://github.com/govindharajan-m/biolab-toolkit.git

2. Navigate to the project directory and open index.html in any modern web browser.

No external dependencies or installation steps are required.

---------------------------------------------------------------------

Example Input Sequence

ATGGCCATTGTAATGGGCCGCTGAAAGGGTGCCCGATAG

The application computes:
- GC content percentage
- Open reading frames
- Protein translation products
- Longest predicted coding region
- Codon usage frequencies
- ORF length graphical representation
- Exportable PDF analysis report

---------------------------------------------------------------------

Intended Use Cases
- Educational demonstration of bioinformatics concepts
- Undergraduate biotechnology and computational biology coursework
- Exploration of gene structure and coding potential
- Rapid, in-browser DNA sequence analysis without external tools

---------------------------------------------------------------------

Future Enhancements
- FASTA file upload and parsing support
- Single-letter amino acid translation mode
- Sliding window GC content and GC skew analysis
- Motif and restriction site search utilities
- Export of results in CSV format

---------------------------------------------------------------------

Author
Govindharajan Mukund
B.Tech Industrial Biotechnology
Anna University

---------------------------------------------------------------------

License
This project is released under the MIT License.


## Preview

<img width="1898" height="784" alt="image" src="https://github.com/user-attachments/assets/717743e8-c0ed-4c81-9ef1-ad5242e6bd3f" />


