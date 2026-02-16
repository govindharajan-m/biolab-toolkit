BioLab Toolkit – DNA Sequence Analysis Web Application

BioLab Toolkit is a browser-based DNA sequence analysis web application designed for biotechnology and bioinformatics students. It performs common sequence analysis tasks entirely on the client side using HTML, CSS, and JavaScript, without requiring any backend or installation.

Live Demo

(Replace with your GitHub Pages link)

https://your-username.github.io/biolab-toolkit/

Features
Sequence Analysis

GC content calculation

Sequence length and nucleotide composition

Reverse complement generation

DNA to RNA transcription

Protein translation using codon table

ORF and Translation Tools

Open Reading Frame (ORF) detection

Three-frame translation

Six-frame translation

Longest ORF prediction (forward and reverse strand)

Codon usage frequency analysis

Visualization and Reporting

ORF length bar graph using Chart.js

Full sequence analysis summary

Export analysis results as a PDF report

Technologies Used

HTML5

CSS3

JavaScript (Vanilla JS)

Chart.js for ORF length visualization

jsPDF for exporting reports as PDF

Project Structure
biolab-toolkit/
│── index.html        # Main user interface
│── style.css         # Styling and layout
│── script.js         # Core sequence analysis logic
│── README.md         # Project documentation

How to Run Locally

Clone the repository:

git clone https://github.com/govindharajan-m/biolab-toolkit.git


Open index.html in any modern web browser.

No additional dependencies or installation steps are required.

Example Input
ATGGCCATTGTAATGGGCCGCTGAAAGGGTGCCCGATAG


The toolkit can compute:

GC content percentage

Detected ORFs

Protein translation

Longest predicted coding region

Codon usage frequencies

ORF length graph

Exportable PDF analysis report

Use Cases

Undergraduate bioinformatics learning

Biotechnology coursework demonstrations

Basic gene and ORF exploration

Quick in-browser DNA sequence analysis

Future Improvements

FASTA file upload support

Single-letter amino acid translation option

Sliding window GC content plots

Motif and restriction site search

Export results as CSV

Author

Govindharajan Mukund
B.Tech Industrial Biotechnology
Anna University

License

This project is released under the MIT License

## Preview

<img width="1898" height="784" alt="image" src="https://github.com/user-attachments/assets/717743e8-c0ed-4c81-9ef1-ad5242e6bd3f" />


