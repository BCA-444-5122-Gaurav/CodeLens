window.window_codelens_notes_data = window.window_codelens_notes_data || {};
window.window_codelens_notes_data.c = [
    {
        id: 'history',
        num: 1,
        title: 'History of C Language',
        html: `<div class="notes-section">\n<h3 class="notes-section-heading">Origins</h3>\n<p class="notes-text">The root of all modern languages is <strong>ALGOL</strong> (Algorithmic Language). ALGOL was the first computer programming language to use a block structure, and it was introduced in 1960.</p>\n<p class="notes-text">In 1967, Martin Richards developed a language called <strong>BCPL</strong> (Basic Combined Programming Language). BCPL was derived from ALGOL.</p>\n<p class="notes-text">In 1970, Ken Thompson created a language using BCPL called <strong>B</strong>. Both BCPL and B programming languages were typeless.</p>\n<p class="notes-text">After that, <strong>C was developed</strong> using BCPL and B by <strong>Dennis Ritchie</strong> at the Bell Lab in <strong>1972</strong>.</p>\n</div>\n<div class="notes-section">\n<h3 class="notes-section-heading">UNIX and C</h3>\n<p class="notes-text">In 1969, Ken Thompson and Dennis Ritchie designed a file system for Bell Laboratories. This file system evolved into an early version of the UNIX Operating System.</p>\n<p class="notes-text">B was interpreter-based, and thus had performance drawbacks; so in 1972 Ritchie developed the language C, which was compiler-based. In 1973, the new file system was rewritten in C language.</p>\n</div>\n<div class="notes-section">\n<h3 class="notes-section-heading">Standardization</h3>\n<p class="notes-text">C was standardized by the <strong>American National Standards Institute (ANSI)</strong> and <strong>International Organization for Standardization (ISO)</strong> in 1983 (ANSI) / 1990 (ISO).</p>\n<p class="notes-text">The purpose was to ensure the compatibility and portability of C programs across different computer systems and hardware platforms.</p>\n<p class="notes-text">The ANSI standardization of C provided a single, widely accepted definition of the language, which allowed programs to be written and compiled on one platform and then run on other platforms without modification.</p>\n</div>\n<div class="notes-section">\n<h3 class="notes-section-heading">Why C Language?</h3>\n<ul class="notes-list">\n<li>C covers all the basic concepts of programming — great for learners.</li>\n<li>It's a base/mother programming language to learn OOP languages like C++, Java, .Net, etc.</li>\n<li>Many modern languages (C++, Java, Python) have borrowed syntax and concepts from C.</li>\n<li>Provides fine-grained control over hardware, making it highly efficient.</li>\n<li>Used to develop system-level programs: Operating Systems, OS kernels, Text Editors, Compilers, Network Drivers.</li>\n<li>C programs are portable — they can run on different platforms without significant modifications.</li>\n<li>Still significant demand for C programmers in various industries.</li>\n</ul>\n</div>\n`
    },
    {
        id: 'features',
        num: 2,
        title: 'Features, Advantages & Disadvantages',
        html: `<div class="notes-section">\n<h3 class="notes-section-heading">Key Features of C</h3>\n<ul class="notes-list">\n<li><strong>Pointers</strong> — C allows referring to memory locations by internal address using pointers.</li>\n<li><strong>Memory Allocation</strong> — C allows dynamic allocation of memory at runtime.</li>\n<li><strong>Recursion</strong> — A function may call itself.</li>\n<li><strong>Bit-Manipulation</strong> — C allows manipulation of data at the lowest level (BITS).</li>\n</ul>\n</div>\n<div class="notes-section">\n<h3 class="notes-section-heading">Advantages</h3>\n<ul class="notes-list">\n<li><strong>Building block</strong> for many other programming languages (Python, C++, Java).</li>\n<li><strong>Powerful and efficient</strong> — contains many data types and operators.</li>\n<li><strong>Portable</strong> — machine independent, run code on any machine.</li>\n<li><strong>Built-in functions</strong> — only 32 keywords in ANSI C with many built-in functions.</li>\n<li><strong>Extensible</strong> — you can add your own functions to the C Standard Library.</li>\n<li><strong>Structured programming</strong> — problems divided into smaller blocks/functions.</li>\n<li><strong>Middle-level language</strong> — supports both high-level and low-level programming.</li>\n<li><strong>Dynamic memory allocation</strong> — allocate memory at run time.</li>\n<li><strong>Procedural programming</strong> — follows a proper procedure for functions and subroutines.</li>\n</ul>\n</div>\n<div class="notes-section">\n<h3 class="notes-section-heading">Disadvantages</h3>\n<ul class="notes-list">\n<li>No concept of OOPs (Inheritance, Polymorphism, Encapsulation, Abstraction).</li>\n<li>No run-time checking — errors shown only after writing the full program.</li>\n<li>No concept of namespace — cannot declare two variables of the same name.</li>\n<li>Lack of Exception Handling.</li>\n<li>No constructor or destructor.</li>\n<li>Low level of abstraction — minimum data hiding affects security.</li>\n</ul>\n</div>\n<div class="notes-section">\n<h3 class="notes-section-heading">Applications of C</h3>\n<ul class="notes-list">\n<li>System Programming (OS, firmware, language translators)</li>\n<li>Embedded Systems (microcontrollers, industrial controllers)</li>\n<li>Compiler and Interpreters development</li>\n<li>Database Systems (DBMS and RDBMS engines)</li>\n<li>Networking Software (protocols, routers)</li>\n<li>Game Development</li>\n<li>Scientific and Mathematical Applications</li>\n<li>Text Editors and IDEs (Vim, Emacs)</li>\n</ul>\n</div>\n`
    },
    {
        id: 'tokens',
        num: 3,
        title: 'Tokens, Keywords & Identifiers',
        html: `<div class="notes-section">\n<h3 class="notes-section-heading">Tokens in C</h3>\n<p class="notes-text">Tokens are the smallest individual elements in C — the building blocks for creating a program. Just as we cannot create a sentence without words, we cannot create a program without tokens.</p>\n<p class="notes-text">Tokens are classified as: <strong>Keywords, Identifiers, Constants, Strings, Special Symbols, and Operators</strong>.</p>\n</div>\n<div class="notes-section">\n<h3 class="notes-section-heading">Keywords (Reserved Words)</h3>\n<p class="notes-text">C language has <strong>32 keywords</strong> — predefined words that have special meaning to the compiler.</p>\n<div class="notes-code-wrapper">
<div class="notes-code-header">
<span class="notes-code-lang">C</span>
<button class="notes-copy-btn" onclick="copyNoteCode(this)" data-code-id="note-code-0">
<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="9" y="9" width="13" height="13" rx="2" ry="2"/><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"/></svg>
Copy
</button>
</div>
<pre class="notes-code-content" id="note-code-0">auto     double   int      struct
break    else     long     switch
case     enum     register typedef
char     extern   return   union
const    short    float    unsigned
continue for      signed   void
default  goto     sizeof   volatile
do       if       static   while</pre>
</div>\n</div>\n<div class="notes-section">\n<h3 class="notes-section-heading">Identifiers</h3>\n<p class="notes-text">Identifiers are names given to variables, constants, functions, structures, pointers, or any user-defined data.</p>\n<p class="notes-text"><strong>Rules for defining Identifiers:</strong></p>\n<ul class="notes-list">\n<li>Can only have alphanumeric characters (a-z, A-Z, 0-9) and underscore (_).</li>\n<li>First character can only be alphabet (a-z, A-Z) or underscore (_).</li>\n<li>Case-sensitive: <code>name</code> and <code>Name</code> are different.</li>\n<li>Keywords cannot be used as identifiers.</li>\n<li>Length should not be more than 31 characters.</li>\n<li>No special characters (semicolon, period, whitespace, slash, comma, etc.).</li>\n</ul>\n<div class="notes-code-wrapper">
<div class="notes-code-header">
<span class="notes-code-lang">C</span>
<button class="notes-copy-btn" onclick="copyNoteCode(this)" data-code-id="note-code-1">
<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="9" y="9" width="13" height="13" rx="2" ry="2"/><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"/></svg>
Copy
</button>
</div>
<pre class="notes-code-content" id="note-code-1">// Valid identifiers:
total, avg1, difference_1;

// Invalid identifiers:
\$myvar;  // incorrect - starts with \$
x!y;     // incorrect - contains !</pre>
</div>\n</div>\n`
    },
    {
        id: 'variables',
        num: 4,
        title: 'Variables & Data Types',
        html: `<div class="notes-section">\n<h3 class="notes-section-heading">What is a Variable?</h3>\n<p class="notes-text">A variable is a name given to a memory location to store values in a computer program. It is used to store information that can be referenced and manipulated.</p>\n<div class="notes-code-wrapper">
<div class="notes-code-header">
<span class="notes-code-lang">C</span>
<button class="notes-copy-btn" onclick="copyNoteCode(this)" data-code-id="note-code-2">
<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="9" y="9" width="13" height="13" rx="2" ry="2"/><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"/></svg>
Copy
</button>
</div>
<pre class="notes-code-content" id="note-code-2">int myvariable = 101;
// 'myvariable' is the identifier
// 'int' is the keyword (data type)
// '101' is the value stored</pre>
</div>\n</div>\n<div class="notes-section">\n<h3 class="notes-section-heading">Fundamental Data Types</h3>\n<p class="notes-text">Fundamental data types are at the lowest level — used for actual data representation in memory.</p>\n<div class="notes-table-wrapper"><table class="notes-table"><thead><tr><th>Data Type</th><th>Bytes (32-bit)</th><th>Min Value</th><th>Max Value</th></tr></thead><tbody><tr><td>char</td><td>1</td><td>-128</td><td>127</td></tr><tr><td>int</td><td>4</td><td>-2,147,483,648</td><td>2,147,483,647</td></tr><tr><td>float</td><td>4</td><td>6 digits precision</td><td>6 digits precision</td></tr></tbody></table></div>\n</div>\n<div class="notes-section">\n<h3 class="notes-section-heading">Derived Data Types</h3>\n<div class="notes-table-wrapper"><table class="notes-table"><thead><tr><th>Data Type</th><th>Bytes (32-bit)</th><th>Min Value</th><th>Max Value</th></tr></thead><tbody><tr><td>short int</td><td>2</td><td>-32,768</td><td>32,767</td></tr><tr><td>long int</td><td>4</td><td>-2^31</td><td>2^31 - 1</td></tr><tr><td>double</td><td>8</td><td>12 digits precision</td><td>12 digits precision</td></tr></tbody></table></div>\n</div>\n<div class="notes-section">\n<h3 class="notes-section-heading">Defining Variables</h3>\n<div class="notes-code-wrapper">
<div class="notes-code-header">
<span class="notes-code-lang">C</span>
<button class="notes-copy-btn" onclick="copyNoteCode(this)" data-code-id="note-code-3">
<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="9" y="9" width="13" height="13" rx="2" ry="2"/><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"/></svg>
Copy
</button>
</div>
<pre class="notes-code-content" id="note-code-3">char alph;            // character, 1 byte, undefined
char a = 'Z';         // character, 1 byte, value 'Z'
int count;            // integer, 4 bytes, undefined
int a, count = 10;    // two ints, count initialized to 10
float fnum;           // float, 4 bytes, undefined
float fnum1, fnum2 = 93.63;  // two floats</pre>
</div>\n</div>\n<div class="notes-section">\n<h3 class="notes-section-heading">Strings in C</h3>\n<p class="notes-text">Strings in C are always represented as an array of characters with a null character <code>'\0'</code> at the end.</p>\n<div class="notes-code-wrapper">
<div class="notes-code-header">
<span class="notes-code-lang">C</span>
<button class="notes-copy-btn" onclick="copyNoteCode(this)" data-code-id="note-code-4">
<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="9" y="9" width="13" height="13" rx="2" ry="2"/><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"/></svg>
Copy
</button>
</div>
<pre class="notes-code-content" id="note-code-4">char str[7] = "CIMAGE";
char str[] = "CIMAGE";
char str[7] = {'C','I','M','A','G','E','\0'};</pre>
</div>\n</div>\n`
    },
    {
        id: 'io',
        num: 5,
        title: 'Input/Output Functions',
        html: `<div class="notes-section">\n<h3 class="notes-section-heading">printf() and scanf()</h3>\n<p class="notes-text">The <code>printf()</code> and <code>scanf()</code> functions are the most commonly used I/O functions in C, defined in <code>stdio.h</code>.</p>\n<div class="notes-code-wrapper">
<div class="notes-code-header">
<span class="notes-code-lang">C</span>
<button class="notes-copy-btn" onclick="copyNoteCode(this)" data-code-id="note-code-5">
<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="9" y="9" width="13" height="13" rx="2" ry="2"/><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"/></svg>
Copy
</button>
</div>
<pre class="notes-code-content" id="note-code-5">#include &lt;stdio.h&gt;
int main() {
    int num;
    printf("Enter a number: ");
    scanf("%d", &amp;num);
    printf("Cube of number is: %d", num * num * num);
    return 0;
}</pre>
</div>\n</div>\n<div class="notes-section">\n<h3 class="notes-section-heading">Format Specifiers</h3>\n<div class="notes-table-wrapper"><table class="notes-table"><thead><tr><th>Data Type</th><th>Format Specifier</th></tr></thead><tbody><tr><td>int</td><td>%d</td></tr><tr><td>char</td><td>%c</td></tr><tr><td>float</td><td>%f</td></tr><tr><td>double</td><td>%lf</td></tr><tr><td>string</td><td>%s</td></tr><tr><td>short int</td><td>%hd</td></tr><tr><td>unsigned int</td><td>%u</td></tr><tr><td>long int</td><td>%li</td></tr><tr><td>long long int</td><td>%lli</td></tr></tbody></table></div>\n</div>\n<div class="notes-section">\n<h3 class="notes-section-heading">Escape Sequences</h3>\n<div class="notes-table-wrapper"><table class="notes-table"><thead><tr><th>Sequence</th><th>Name</th><th>Description</th></tr></thead><tbody><tr><td>\\n</td><td>New Line</td><td>Moves cursor to start of next line</td></tr><tr><td>\\t</td><td>Horizontal Tab</td><td>Inserts whitespace</td></tr><tr><td>\\a</td><td>Alarm/Beep</td><td>Generates a bell sound</td></tr><tr><td>\\b</td><td>Backspace</td><td>Moves cursor backward</td></tr><tr><td>\\r</td><td>Carriage Return</td><td>Moves cursor to start of current line</td></tr><tr><td>\\\\</td><td>Backslash</td><td>Inserts backslash character</td></tr><tr><td>\\'</td><td>Single Quote</td><td>Displays single quotation mark</td></tr><tr><td>\\"</td><td>Double Quote</td><td>Displays double quotation marks</td></tr><tr><td>\\0</td><td>NULL</td><td>Represents the NULL character</td></tr></tbody></table></div>\n</div>\n<div class="notes-section">\n<h3 class="notes-section-heading">Character I/O Example</h3>\n<div class="notes-code-wrapper">
<div class="notes-code-header">
<span class="notes-code-lang">C</span>
<button class="notes-copy-btn" onclick="copyNoteCode(this)" data-code-id="note-code-6">
<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="9" y="9" width="13" height="13" rx="2" ry="2"/><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"/></svg>
Copy
</button>
</div>
<pre class="notes-code-content" id="note-code-6">#include &lt;stdio.h&gt;
int main() {
    char chr;
    printf("Enter a character: ");
    scanf("%c", &amp;chr);
    printf("You entered %c.
", chr);
    printf("ASCII value is %d.", chr);
    return 0;
}</pre>
</div>\n</div>\n<div class="notes-section">\n<h3 class="notes-section-heading">Numeric I/O Example</h3>\n<div class="notes-code-wrapper">
<div class="notes-code-header">
<span class="notes-code-lang">C</span>
<button class="notes-copy-btn" onclick="copyNoteCode(this)" data-code-id="note-code-7">
<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="9" y="9" width="13" height="13" rx="2" ry="2"/><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"/></svg>
Copy
</button>
</div>
<pre class="notes-code-content" id="note-code-7">#include &lt;stdio.h&gt;
int main() {
    int testInteger;
    float num1;
    double num2;
    printf("Enter an integer: ");
    scanf("%d", &amp;testInteger);
    printf("Enter a Fractional number: ");
    scanf("%f", &amp;num1);
    printf("Enter another fractional number: ");
    scanf("%lf", &amp;num2);
    printf("num1 = %f
", num1);
    printf("num2 = %lf
", num2);
    printf("Number = %d", testInteger);
    return 0;
}</pre>
</div>\n</div>\n<div class="notes-section">\n<h3 class="notes-section-heading">sizeof Operator</h3>\n<p class="notes-text"><code>sizeof</code> is a compile-time unary operator used to compute the size of its operand. It can be applied to any data type.</p>\n<div class="notes-code-wrapper">
<div class="notes-code-header">
<span class="notes-code-lang">C</span>
<button class="notes-copy-btn" onclick="copyNoteCode(this)" data-code-id="note-code-8">
<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="9" y="9" width="13" height="13" rx="2" ry="2"/><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"/></svg>
Copy
</button>
</div>
<pre class="notes-code-content" id="note-code-8">#include &lt;stdio.h&gt;
int main() {
    printf("%d
", sizeof(char));       // 1
    printf("%d
", sizeof(int));        // 4
    printf("%d
", sizeof(float));      // 4
    printf("%d
", sizeof(double));     // 8
    printf("%d
", sizeof(long double));
    printf("%d
", sizeof(short int));
    return 0;
}</pre>
</div>\n</div>\n`
    },
    {
        id: 'operators',
        num: 6,
        title: 'Operators',
        html: `<div class="notes-section">\n<h3 class="notes-section-heading">Types of Operators</h3>\n<p class="notes-text">Operators in C are special symbols used to perform operations on operands.</p>\n<ul class="notes-list">\n<li><strong>Unary Operators</strong> — applied to a single operand: ++, --, sizeof, (type)*</li>\n<li><strong>Binary Operators</strong> — applied between two operands: Arithmetic, Relational, Logical, Bitwise, Assignment</li>\n</ul>\n</div>\n<div class="notes-section">\n<h3 class="notes-section-heading">Arithmetic Operators</h3>\n<div class="notes-table-wrapper"><table class="notes-table"><thead><tr><th>Operator</th><th>Meaning</th></tr></thead><tbody><tr><td>+</td><td>Addition or unary plus</td></tr><tr><td>-</td><td>Subtraction or unary minus</td></tr><tr><td>*</td><td>Multiplication</td></tr><tr><td>/</td><td>Division</td></tr><tr><td>%</td><td>Remainder after division (modulo)</td></tr></tbody></table></div>\n<div class="notes-code-wrapper">
<div class="notes-code-header">
<span class="notes-code-lang">C</span>
<button class="notes-copy-btn" onclick="copyNoteCode(this)" data-code-id="note-code-9">
<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="9" y="9" width="13" height="13" rx="2" ry="2"/><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"/></svg>
Copy
</button>
</div>
<pre class="notes-code-content" id="note-code-9">#include &lt;stdio.h&gt;
int main() {
    int a = 9, b = 4, c;
    c = a + b;  printf("a+b = %d
", c);   // 13
    c = a - b;  printf("a-b = %d
", c);   // 5
    c = a * b;  printf("a*b = %d
", c);   // 36
    c = a / b;  printf("a/b = %d
", c);   // 2
    c = a % b;  printf("a%%b = %d
", c);  // 1
    return 0;
}</pre>
</div>\n</div>\n<div class="notes-section">\n<h3 class="notes-section-heading">Assignment Operators</h3>\n<div class="notes-table-wrapper"><table class="notes-table"><thead><tr><th>Operator</th><th>Example</th><th>Same As</th></tr></thead><tbody><tr><td>=</td><td>a = b</td><td>a = b</td></tr><tr><td>+=</td><td>a += b</td><td>a = a + b</td></tr><tr><td>-=</td><td>a -= b</td><td>a = a - b</td></tr><tr><td>*=</td><td>a *= b</td><td>a = a * b</td></tr><tr><td>/=</td><td>a /= b</td><td>a = a / b</td></tr><tr><td>%=</td><td>a %= b</td><td>a = a % b</td></tr></tbody></table></div>\n</div>\n<div class="notes-section">\n<h3 class="notes-section-heading">Relational Operators</h3>\n<div class="notes-table-wrapper"><table class="notes-table"><thead><tr><th>Operator</th><th>Meaning</th><th>Example</th></tr></thead><tbody><tr><td>==</td><td>Equal to</td><td>5 == 3 → 0</td></tr><tr><td>></td><td>Greater than</td><td>5 > 3 → 1</td></tr><tr><td><</td><td>Less than</td><td>5 < 3 → 0</td></tr><tr><td>!=</td><td>Not equal to</td><td>5 != 3 → 1</td></tr><tr><td>>=</td><td>Greater than or equal to</td><td>5 >= 3 → 1</td></tr><tr><td><=</td><td>Less than or equal to</td><td>5 <= 3 → 0</td></tr></tbody></table></div>\n</div>\n<div class="notes-section">\n<h3 class="notes-section-heading">Increment & Decrement</h3>\n<p class="notes-text"><code>++</code> increases the value by 1, <code>--</code> decreases by 1. These are unary operators.</p>\n<div class="notes-code-wrapper">
<div class="notes-code-header">
<span class="notes-code-lang">C</span>
<button class="notes-copy-btn" onclick="copyNoteCode(this)" data-code-id="note-code-10">
<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="9" y="9" width="13" height="13" rx="2" ry="2"/><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"/></svg>
Copy
</button>
</div>
<pre class="notes-code-content" id="note-code-10">#include &lt;stdio.h&gt;
int main() {
    int a = 10, b = 100;
    printf("++a = %d
", ++a);  // 11 (pre-increment)
    printf("--b = %d
", --b);  // 99 (pre-decrement)
    return 0;
}</pre>
</div>\n</div>\n<div class="notes-section">\n<h3 class="notes-section-heading">Operator Precedence</h3>\n<p class="notes-text">C defines rules for the order in which operators in an expression are evaluated. Operators with higher precedence are applied before those with lower precedence. Parentheses can override precedence.</p>\n<div class="notes-code-wrapper">
<div class="notes-code-header">
<span class="notes-code-lang">C</span>
<button class="notes-copy-btn" onclick="copyNoteCode(this)" data-code-id="note-code-11">
<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="9" y="9" width="13" height="13" rx="2" ry="2"/><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"/></svg>
Copy
</button>
</div>
<pre class="notes-code-content" id="note-code-11">// Without parentheses:
3 * 5 + 2;     // Result: 17 (multiplication first)

// With parentheses:
3 * (5 + 2);   // Result: 21 (addition first)</pre>
</div>\n</div>\n`
    },
    {
        id: 'control',
        num: 7,
        title: 'Control Flow (if/else, switch)',
        html: `<div class="notes-section">\n<h3 class="notes-section-heading">Conditional Constructs</h3>\n<p class="notes-text">Control statements enable programmers to control the flow of execution. C provides: <code>if</code>, <code>if...else</code>, nested if, <code>else if</code> ladder, <code>switch</code>, and the ternary <code>?:</code> operator.</p>\n</div>\n<div class="notes-section">\n<h3 class="notes-section-heading">The if Statement</h3>\n<div class="notes-code-wrapper">
<div class="notes-code-header">
<span class="notes-code-lang">C</span>
<button class="notes-copy-btn" onclick="copyNoteCode(this)" data-code-id="note-code-12">
<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="9" y="9" width="13" height="13" rx="2" ry="2"/><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"/></svg>
Copy
</button>
</div>
<pre class="notes-code-content" id="note-code-12">#include &lt;stdio.h&gt;
int main() {
    int age = 20;
    if (age &gt; 18) {
        printf("Age is greater than 18
");
    }
    printf("Part of Main()
");
    return 0;
}</pre>
</div>\n</div>\n<div class="notes-section">\n<h3 class="notes-section-heading">The if...else Statement</h3>\n<div class="notes-code-wrapper">
<div class="notes-code-header">
<span class="notes-code-lang">C</span>
<button class="notes-copy-btn" onclick="copyNoteCode(this)" data-code-id="note-code-13">
<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="9" y="9" width="13" height="13" rx="2" ry="2"/><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"/></svg>
Copy
</button>
</div>
<pre class="notes-code-content" id="note-code-13">#include &lt;stdio.h&gt;
int main() {
    int number = 13;
    if (number % 2 == 0) {
        printf("Even number
");
    } else {
        printf("Odd number
");
    }
    return 0;
}</pre>
</div>\n</div>\n<div class="notes-section">\n<h3 class="notes-section-heading">Nested if Statement</h3>\n<div class="notes-code-wrapper">
<div class="notes-code-header">
<span class="notes-code-lang">C</span>
<button class="notes-copy-btn" onclick="copyNoteCode(this)" data-code-id="note-code-14">
<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="9" y="9" width="13" height="13" rx="2" ry="2"/><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"/></svg>
Copy
</button>
</div>
<pre class="notes-code-content" id="note-code-14">#include &lt;stdio.h&gt;
int main() {
    int age = 20;
    int weight = 80;
    if (age &gt;= 18) {
        if (weight &gt; 50) {
            printf("You are eligible to donate blood
");
        }
    }
    return 0;
}</pre>
</div>\n</div>\n<div class="notes-section">\n<h3 class="notes-section-heading">if-else-if Ladder</h3>\n<div class="notes-code-wrapper">
<div class="notes-code-header">
<span class="notes-code-lang">C</span>
<button class="notes-copy-btn" onclick="copyNoteCode(this)" data-code-id="note-code-15">
<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="9" y="9" width="13" height="13" rx="2" ry="2"/><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"/></svg>
Copy
</button>
</div>
<pre class="notes-code-content" id="note-code-15">#include &lt;stdio.h&gt;
int main() {
    int marks = 65;
    if (marks &gt;= 90) {
        printf("A+ grade
");
    } else if (marks &gt;= 80) {
        printf("A grade
");
    } else if (marks &gt;= 70) {
        printf("B grade
");
    } else if (marks &gt;= 60) {
        printf("C grade
");
    } else if (marks &gt;= 50) {
        printf("D grade
");
    } else {
        printf("Fail
");
    }
    return 0;
}</pre>
</div>\n</div>\n<div class="notes-section">\n<h3 class="notes-section-heading">The switch Construct</h3>\n<p class="notes-text">The <code>switch</code> statement tests the value of a variable against a list of case values.</p>\n<div class="notes-code-wrapper">
<div class="notes-code-header">
<span class="notes-code-lang">C</span>
<button class="notes-copy-btn" onclick="copyNoteCode(this)" data-code-id="note-code-16">
<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="9" y="9" width="13" height="13" rx="2" ry="2"/><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"/></svg>
Copy
</button>
</div>
<pre class="notes-code-content" id="note-code-16">#include &lt;stdio.h&gt;
int main() {
    int day = 3;
    switch (day) {
        case 1: printf("Monday"); break;
        case 2: printf("Tuesday"); break;
        case 3: printf("Wednesday"); break;
        case 4: printf("Thursday"); break;
        case 5: printf("Friday"); break;
        default: printf("Weekend");
    }
    return 0;
}</pre>
</div>\n<div class="notes-info notes-info-note">Rules: The switch expression must be int or char. Case values must be constants. The <code>break</code> statement is optional but recommended. The <code>default</code> case is optional.</div>\n</div>\n<div class="notes-section">\n<h3 class="notes-section-heading">Ternary Operator (?:)</h3>\n<p class="notes-text">The ternary operator is a shorthand for if...else:</p>\n<div class="notes-code-wrapper">
<div class="notes-code-header">
<span class="notes-code-lang">C</span>
<button class="notes-copy-btn" onclick="copyNoteCode(this)" data-code-id="note-code-17">
<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="9" y="9" width="13" height="13" rx="2" ry="2"/><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"/></svg>
Copy
</button>
</div>
<pre class="notes-code-content" id="note-code-17">int a = 10, b = 20;
int max = (a &gt; b) ? a : b;
printf("Max = %d", max);  // Max = 20</pre>
</div>\n</div>\n<div class="notes-section">\n<h3 class="notes-section-heading">Logical Operators</h3>\n<div class="notes-table-wrapper"><table class="notes-table"><thead><tr><th>Operator</th><th>Name</th><th>Example</th></tr></thead><tbody><tr><td>&&</td><td>Logical AND</td><td>(a > 5 && b < 10) — true if both are true</td></tr><tr><td>||</td><td>Logical OR</td><td>(a > 5 || b < 10) — true if either is true</td></tr><tr><td>!</td><td>Logical NOT</td><td>!(a > 5) — reverses the result</td></tr></tbody></table></div>\n</div>\n`
    },
    {
        id: 'loops',
        num: 8,
        title: 'Loops (while, do-while, for)',
        html: `<div class="notes-section">\n<h3 class="notes-section-heading">Why Looping?</h3>\n<p class="notes-text">Loops are used when a set of statements needs to be executed repeatedly. Every loop has: <strong>initialization</strong>, <strong>condition</strong>, and <strong>update</strong>.</p>\n</div>\n<div class="notes-section">\n<h3 class="notes-section-heading">while Loop</h3>\n<div class="notes-code-wrapper">
<div class="notes-code-header">
<span class="notes-code-lang">C</span>
<button class="notes-copy-btn" onclick="copyNoteCode(this)" data-code-id="note-code-18">
<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="9" y="9" width="13" height="13" rx="2" ry="2"/><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"/></svg>
Copy
</button>
</div>
<pre class="notes-code-content" id="note-code-18">#include &lt;stdio.h&gt;
int main() {
    // Print 10 natural numbers
    int i = 1;
    while (i &lt;= 10) {
        printf("%d ", i);
        i++;
    }
    return 0;
}</pre>
</div>\n</div>\n<div class="notes-section">\n<h3 class="notes-section-heading">do-while Loop</h3>\n<p class="notes-text">The <code>do...while</code> loop executes the body at least once before checking the condition.</p>\n<div class="notes-code-wrapper">
<div class="notes-code-header">
<span class="notes-code-lang">C</span>
<button class="notes-copy-btn" onclick="copyNoteCode(this)" data-code-id="note-code-19">
<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="9" y="9" width="13" height="13" rx="2" ry="2"/><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"/></svg>
Copy
</button>
</div>
<pre class="notes-code-content" id="note-code-19">#include &lt;stdio.h&gt;
int main() {
    int i = 1;
    do {
        printf("%d ", i);
        i++;
    } while (i &lt;= 10);
    return 0;
}</pre>
</div>\n</div>\n<div class="notes-section">\n<h3 class="notes-section-heading">for Loop</h3>\n<div class="notes-code-wrapper">
<div class="notes-code-header">
<span class="notes-code-lang">C</span>
<button class="notes-copy-btn" onclick="copyNoteCode(this)" data-code-id="note-code-20">
<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="9" y="9" width="13" height="13" rx="2" ry="2"/><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"/></svg>
Copy
</button>
</div>
<pre class="notes-code-content" id="note-code-20">#include &lt;stdio.h&gt;
int main() {
    for (int i = 1; i &lt;= 10; i++) {
        printf("%d ", i);
    }
    return 0;
}</pre>
</div>\n</div>\n<div class="notes-section">\n<h3 class="notes-section-heading">Reverse a Number</h3>\n<div class="notes-code-wrapper">
<div class="notes-code-header">
<span class="notes-code-lang">C</span>
<button class="notes-copy-btn" onclick="copyNoteCode(this)" data-code-id="note-code-21">
<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="9" y="9" width="13" height="13" rx="2" ry="2"/><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"/></svg>
Copy
</button>
</div>
<pre class="notes-code-content" id="note-code-21">#include &lt;stdio.h&gt;
int main() {
    int num, rev = 0, rem;
    printf("Enter a number: ");
    scanf("%d", &amp;num);
    while (num != 0) {
        rem = num % 10;
        rev = rev * 10 + rem;
        num /= 10;
    }
    printf("Reversed number: %d", rev);
    return 0;
}</pre>
</div>\n</div>\n<div class="notes-section">\n<h3 class="notes-section-heading">Armstrong Number</h3>\n<div class="notes-code-wrapper">
<div class="notes-code-header">
<span class="notes-code-lang">C</span>
<button class="notes-copy-btn" onclick="copyNoteCode(this)" data-code-id="note-code-22">
<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="9" y="9" width="13" height="13" rx="2" ry="2"/><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"/></svg>
Copy
</button>
</div>
<pre class="notes-code-content" id="note-code-22">#include &lt;stdio.h&gt;
#include &lt;math.h&gt;
int main() {
    int num, original, rem, result = 0, n = 0;
    printf("Enter a number: ");
    scanf("%d", &amp;num);
    original = num;
    // Count digits
    while (original != 0) {
        original /= 10;
        n++;
    }
    original = num;
    while (original != 0) {
        rem = original % 10;
        result += pow(rem, n);
        original /= 10;
    }
    if (result == num)
        printf("%d is an Armstrong number", num);
    else
        printf("%d is not an Armstrong number", num);
    return 0;
}</pre>
</div>\n</div>\n<div class="notes-section">\n<h3 class="notes-section-heading">Jump Statements</h3>\n<p class="notes-text"><strong>break</strong> — exits the loop immediately.<br><strong>continue</strong> — skips the current iteration and moves to next.<br><strong>goto</strong> — jumps to a labeled statement (generally discouraged).</p>\n<div class="notes-code-wrapper">
<div class="notes-code-header">
<span class="notes-code-lang">C</span>
<button class="notes-copy-btn" onclick="copyNoteCode(this)" data-code-id="note-code-23">
<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="9" y="9" width="13" height="13" rx="2" ry="2"/><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"/></svg>
Copy
</button>
</div>
<pre class="notes-code-content" id="note-code-23">// break example
for (int i = 1; i &lt;= 10; i++) {
    if (i == 5) break;
    printf("%d ", i);  // prints: 1 2 3 4
}

// continue example
for (int i = 1; i &lt;= 10; i++) {
    if (i == 5) continue;
    printf("%d ", i);  // prints: 1 2 3 4 6 7 8 9 10
}</pre>
</div>\n</div>\n`
    },
    {
        id: 'functions',
        num: 9,
        title: 'Functions',
        html: `<div class="notes-section">\n<h3 class="notes-section-heading">What is a Function?</h3>\n<p class="notes-text">A function is a block of code that performs a specific task. C has two types: <strong>Library functions</strong> (built-in like printf, scanf) and <strong>User-defined functions</strong>.</p>\n</div>\n<div class="notes-section">\n<h3 class="notes-section-heading">Function Declaration & Definition</h3>\n<div class="notes-code-wrapper">
<div class="notes-code-header">
<span class="notes-code-lang">C</span>
<button class="notes-copy-btn" onclick="copyNoteCode(this)" data-code-id="note-code-24">
<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="9" y="9" width="13" height="13" rx="2" ry="2"/><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"/></svg>
Copy
</button>
</div>
<pre class="notes-code-content" id="note-code-24">// Declaration (prototype)
return_type function_name(parameter_list);

// Definition
return_type function_name(parameter_list) {
    // function body
    return value;
}</pre>
</div>\n</div>\n<div class="notes-section">\n<h3 class="notes-section-heading">Types of User-Defined Functions</h3>\n<p class="notes-text"><strong>1. No arguments, no return value:</strong></p>\n<div class="notes-code-wrapper">
<div class="notes-code-header">
<span class="notes-code-lang">C</span>
<button class="notes-copy-btn" onclick="copyNoteCode(this)" data-code-id="note-code-25">
<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="9" y="9" width="13" height="13" rx="2" ry="2"/><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"/></svg>
Copy
</button>
</div>
<pre class="notes-code-content" id="note-code-25">void greet() {
    printf("Hello!
");
}
int main() {
    greet();
    return 0;
}</pre>
</div>\n<p class="notes-text"><strong>2. No arguments, with return value:</strong></p>\n<div class="notes-code-wrapper">
<div class="notes-code-header">
<span class="notes-code-lang">C</span>
<button class="notes-copy-btn" onclick="copyNoteCode(this)" data-code-id="note-code-26">
<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="9" y="9" width="13" height="13" rx="2" ry="2"/><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"/></svg>
Copy
</button>
</div>
<pre class="notes-code-content" id="note-code-26">int getNumber() {
    return 42;
}
int main() {
    int n = getNumber();
    printf("%d", n);
    return 0;
}</pre>
</div>\n<p class="notes-text"><strong>3. With arguments, no return value:</strong></p>\n<div class="notes-code-wrapper">
<div class="notes-code-header">
<span class="notes-code-lang">C</span>
<button class="notes-copy-btn" onclick="copyNoteCode(this)" data-code-id="note-code-27">
<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="9" y="9" width="13" height="13" rx="2" ry="2"/><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"/></svg>
Copy
</button>
</div>
<pre class="notes-code-content" id="note-code-27">void display(int n) {
    printf("Number: %d
", n);
}
int main() {
    display(10);
    return 0;
}</pre>
</div>\n<p class="notes-text"><strong>4. With arguments and return value:</strong></p>\n<div class="notes-code-wrapper">
<div class="notes-code-header">
<span class="notes-code-lang">C</span>
<button class="notes-copy-btn" onclick="copyNoteCode(this)" data-code-id="note-code-28">
<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="9" y="9" width="13" height="13" rx="2" ry="2"/><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"/></svg>
Copy
</button>
</div>
<pre class="notes-code-content" id="note-code-28">int add(int a, int b) {
    return a + b;
}
int main() {
    int sum = add(5, 3);
    printf("Sum = %d", sum);
    return 0;
}</pre>
</div>\n</div>\n<div class="notes-section">\n<h3 class="notes-section-heading">Call by Value vs Call by Reference</h3>\n<p class="notes-text"><strong>Call by Value:</strong> A copy of the argument is passed. Changes inside the function do NOT affect the original.</p>\n<p class="notes-text"><strong>Call by Reference:</strong> The address of the argument is passed. Changes inside the function DO affect the original.</p>\n<div class="notes-code-wrapper">
<div class="notes-code-header">
<span class="notes-code-lang">C</span>
<button class="notes-copy-btn" onclick="copyNoteCode(this)" data-code-id="note-code-29">
<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="9" y="9" width="13" height="13" rx="2" ry="2"/><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"/></svg>
Copy
</button>
</div>
<pre class="notes-code-content" id="note-code-29">// Call by Value
void swap_val(int a, int b) {
    int temp = a;
    a = b;
    b = temp;
    // Original values unchanged!
}

// Call by Reference
void swap_ref(int *a, int *b) {
    int temp = *a;
    *a = *b;
    *b = temp;
    // Original values are swapped!
}</pre>
</div>\n</div>\n`
    },
    {
        id: 'storage',
        num: 10,
        title: 'Storage Classes & Constants',
        html: `<div class="notes-section">\n<h3 class="notes-section-heading">Types of Variables</h3>\n<p class="notes-text"><strong>Local variables</strong> are declared inside a function/block and can only be used within that scope. <strong>Global variables</strong> are declared outside functions and accessible from any function.</p>\n</div>\n<div class="notes-section">\n<h3 class="notes-section-heading">Storage Classes</h3>\n<div class="notes-table-wrapper"><table class="notes-table"><thead><tr><th>Storage Class</th><th>Keyword</th><th>Scope</th><th>Lifetime</th></tr></thead><tbody><tr><td>Automatic</td><td>auto</td><td>Local (block)</td><td>Until block ends</td></tr><tr><td>External</td><td>extern</td><td>Global</td><td>Entire program</td></tr><tr><td>Static</td><td>static</td><td>Local (block)</td><td>Entire program</td></tr><tr><td>Register</td><td>register</td><td>Local (block)</td><td>Until block ends</td></tr></tbody></table></div>\n</div>\n<div class="notes-section">\n<h3 class="notes-section-heading">static Example</h3>\n<div class="notes-code-wrapper">
<div class="notes-code-header">
<span class="notes-code-lang">C</span>
<button class="notes-copy-btn" onclick="copyNoteCode(this)" data-code-id="note-code-30">
<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="9" y="9" width="13" height="13" rx="2" ry="2"/><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"/></svg>
Copy
</button>
</div>
<pre class="notes-code-content" id="note-code-30">#include &lt;stdio.h&gt;
void counter() {
    static int count = 0;  // retains value between calls
    count++;
    printf("Count = %d
", count);
}
int main() {
    counter();  // Count = 1
    counter();  // Count = 2
    counter();  // Count = 3
    return 0;
}</pre>
</div>\n</div>\n<div class="notes-section">\n<h3 class="notes-section-heading">Constants</h3>\n<p class="notes-text">Constants are fixed values that cannot be altered during program execution.</p>\n<div class="notes-code-wrapper">
<div class="notes-code-header">
<span class="notes-code-lang">C</span>
<button class="notes-copy-btn" onclick="copyNoteCode(this)" data-code-id="note-code-31">
<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="9" y="9" width="13" height="13" rx="2" ry="2"/><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"/></svg>
Copy
</button>
</div>
<pre class="notes-code-content" id="note-code-31">// Using const keyword
const int MAX = 100;

// Using #define preprocessor
#define PI 3.14159</pre>
</div>\n</div>\n`
    },
    {
        id: 'arrays',
        num: 11,
        title: 'Arrays',
        html: `<div class="notes-section">\n<h3 class="notes-section-heading">What is an Array?</h3>\n<p class="notes-text">An array in C is a fixed-size collection of similar data items stored in contiguous memory locations.</p>\n<div class="notes-code-wrapper">
<div class="notes-code-header">
<span class="notes-code-lang">C</span>
<button class="notes-copy-btn" onclick="copyNoteCode(this)" data-code-id="note-code-32">
<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="9" y="9" width="13" height="13" rx="2" ry="2"/><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"/></svg>
Copy
</button>
</div>
<pre class="notes-code-content" id="note-code-32">// Declaration
int arr[5];

// Initialization
int arr[5] = {0, 1, 2, 3, 4};

// Access elements (0-indexed)
printf("%d", arr[0]);  // prints 0</pre>
</div>\n</div>\n<div class="notes-section">\n<h3 class="notes-section-heading">One-Dimensional Array Example</h3>\n<div class="notes-code-wrapper">
<div class="notes-code-header">
<span class="notes-code-lang">C</span>
<button class="notes-copy-btn" onclick="copyNoteCode(this)" data-code-id="note-code-33">
<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="9" y="9" width="13" height="13" rx="2" ry="2"/><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"/></svg>
Copy
</button>
</div>
<pre class="notes-code-content" id="note-code-33">#include &lt;stdio.h&gt;
int main() {
    int arr[3] = {10, 20, 30};
    for (int i = 0; i &lt; 3; i++) {
        printf("Value of arr[%d]: %d
", i, arr[i]);
    }
    return 0;
}</pre>
</div>\n</div>\n<div class="notes-section">\n<h3 class="notes-section-heading">Runtime Initialization</h3>\n<div class="notes-code-wrapper">
<div class="notes-code-header">
<span class="notes-code-lang">C</span>
<button class="notes-copy-btn" onclick="copyNoteCode(this)" data-code-id="note-code-34">
<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="9" y="9" width="13" height="13" rx="2" ry="2"/><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"/></svg>
Copy
</button>
</div>
<pre class="notes-code-content" id="note-code-34">#include &lt;stdio.h&gt;
int main() {
    int nums[5];
    printf("Enter 5 elements: ");
    for (int i = 0; i &lt; 5; i++) {
        scanf("%d", &amp;nums[i]);
    }
    printf("Array elements: ");
    for (int i = 0; i &lt; 5; i++) {
        printf("%d ", nums[i]);
    }
    return 0;
}</pre>
</div>\n</div>\n<div class="notes-section">\n<h3 class="notes-section-heading">Two-Dimensional Array</h3>\n<div class="notes-code-wrapper">
<div class="notes-code-header">
<span class="notes-code-lang">C</span>
<button class="notes-copy-btn" onclick="copyNoteCode(this)" data-code-id="note-code-35">
<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="9" y="9" width="13" height="13" rx="2" ry="2"/><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"/></svg>
Copy
</button>
</div>
<pre class="notes-code-content" id="note-code-35">#include &lt;stdio.h&gt;
int main() {
    int arr[3][5] = {
        {1, 2, 3, 4, 5},
        {10, 20, 30, 40, 50},
        {5, 10, 15, 20, 25}
    };
    // Print as matrix
    for (int i = 0; i &lt; 3; i++) {
        for (int j = 0; j &lt; 5; j++) {
            printf("%4d", arr[i][j]);
        }
        printf("
");
    }
    return 0;
}</pre>
</div>\n</div>\n<div class="notes-section">\n<h3 class="notes-section-heading">Passing Arrays to Functions</h3>\n<div class="notes-code-wrapper">
<div class="notes-code-header">
<span class="notes-code-lang">C</span>
<button class="notes-copy-btn" onclick="copyNoteCode(this)" data-code-id="note-code-36">
<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="9" y="9" width="13" height="13" rx="2" ry="2"/><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"/></svg>
Copy
</button>
</div>
<pre class="notes-code-content" id="note-code-36">#include &lt;stdio.h&gt;
float calculateSum(float num[]) {
    float sum = 0.0;
    for (int i = 0; i &lt; 6; ++i) {
        sum += num[i];
    }
    return sum;
}
int main() {
    float result, num[] = {23.4, 55, 22.6, 3, 40.5, 18};
    result = calculateSum(num);
    printf("Result = %.2f", result);
    return 0;
}</pre>
</div>\n</div>\n<div class="notes-section">\n<h3 class="notes-section-heading">Bubble Sort Example</h3>\n<div class="notes-code-wrapper">
<div class="notes-code-header">
<span class="notes-code-lang">C</span>
<button class="notes-copy-btn" onclick="copyNoteCode(this)" data-code-id="note-code-37">
<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="9" y="9" width="13" height="13" rx="2" ry="2"/><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"/></svg>
Copy
</button>
</div>
<pre class="notes-code-content" id="note-code-37">#include &lt;stdio.h&gt;
void Bubble_Sort(int a[], int n) {
    int i, j, temp;
    for (i = 0; i &lt; n; i++) {
        for (j = i + 1; j &lt; n; j++) {
            if (a[i] &gt; a[j]) {
                temp = a[i];
                a[i] = a[j];
                a[j] = temp;
            }
        }
    }
    printf("Sorted: ");
    for (i = 0; i &lt; n; i++) {
        printf("%d ", a[i]);
    }
}
int main() {
    int arr[] = {7, 12, 4, 45, 8};
    Bubble_Sort(arr, 5);
    return 0;
}</pre>
</div>\n</div>\n<div class="notes-section">\n<h3 class="notes-section-heading">Three-Dimensional Array</h3>\n<div class="notes-code-wrapper">
<div class="notes-code-header">
<span class="notes-code-lang">C</span>
<button class="notes-copy-btn" onclick="copyNoteCode(this)" data-code-id="note-code-38">
<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="9" y="9" width="13" height="13" rx="2" ry="2"/><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"/></svg>
Copy
</button>
</div>
<pre class="notes-code-content" id="note-code-38">#include &lt;stdio.h&gt;
int main() {
    int x[2][3][2] = {
        { {0, 1}, {2, 3}, {4, 5} },
        { {6, 7}, {8, 9}, {10, 11} }
    };
    for (int i = 0; i &lt; 2; ++i) {
        for (int j = 0; j &lt; 3; ++j) {
            for (int k = 0; k &lt; 2; ++k) {
                printf("x[%d][%d][%d] = %d
", i, j, k, x[i][j][k]);
            }
        }
    }
    return 0;
}</pre>
</div>\n</div>\n`
    },
    {
        id: 'strings',
        num: 12,
        title: 'Strings & String Functions',
        html: `<div class="notes-section">\n<h3 class="notes-section-heading">String Basics</h3>\n<p class="notes-text">Strings in C are arrays of characters terminated by a null character <code>'\0'</code>.</p>\n<div class="notes-code-wrapper">
<div class="notes-code-header">
<span class="notes-code-lang">C</span>
<button class="notes-copy-btn" onclick="copyNoteCode(this)" data-code-id="note-code-39">
<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="9" y="9" width="13" height="13" rx="2" ry="2"/><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"/></svg>
Copy
</button>
</div>
<pre class="notes-code-content" id="note-code-39">#include &lt;stdio.h&gt;
int main() {
    char str[101];
    int i;
    printf("Enter a String: ");
    scanf("%s", str);
    for (i = 0; str[i] != '\0'; i++);
    printf("Length of the string is: %d", i);
    return 0;
}</pre>
</div>\n</div>\n<div class="notes-section">\n<h3 class="notes-section-heading">Reverse a String</h3>\n<div class="notes-code-wrapper">
<div class="notes-code-header">
<span class="notes-code-lang">C</span>
<button class="notes-copy-btn" onclick="copyNoteCode(this)" data-code-id="note-code-40">
<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="9" y="9" width="13" height="13" rx="2" ry="2"/><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"/></svg>
Copy
</button>
</div>
<pre class="notes-code-content" id="note-code-40">#include &lt;stdio.h&gt;
int main() {
    char str[101];
    int i, length;
    printf("Enter a String: ");
    scanf("%s", str);
    for (i = 0; str[i] != '\0'; i++);
    length = i;
    for (--i; i &gt;= 0; i--) {
        printf("%c", str[i]);
    }
    printf("
Length: %d", length);
    return 0;
}</pre>
</div>\n</div>\n<div class="notes-section">\n<h3 class="notes-section-heading">String Library Functions</h3>\n<p class="notes-text">Include <code>&lt;string.h&gt;</code> to use these functions:</p>\n<div class="notes-table-wrapper"><table class="notes-table"><thead><tr><th>Function</th><th>Description</th></tr></thead><tbody><tr><td>strcmp(s1, s2)</td><td>Compares two strings. Returns 0 if equal.</td></tr><tr><td>strcpy(dest, src)</td><td>Copies src string to dest.</td></tr><tr><td>strcat(dest, src)</td><td>Concatenates src to end of dest.</td></tr><tr><td>strlen(str)</td><td>Returns length of the string.</td></tr></tbody></table></div>\n<div class="notes-code-wrapper">
<div class="notes-code-header">
<span class="notes-code-lang">C</span>
<button class="notes-copy-btn" onclick="copyNoteCode(this)" data-code-id="note-code-41">
<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="9" y="9" width="13" height="13" rx="2" ry="2"/><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"/></svg>
Copy
</button>
</div>
<pre class="notes-code-content" id="note-code-41">#include &lt;stdio.h&gt;
#include &lt;string.h&gt;
int main() {
    char s1[20] = "CIMAGE";
    char s2[20] = "COLLEGE";
    if (strcmp(s1, s2) == 0)
        printf("Strings are equal");
    else
        printf("Strings are different");
    return 0;
}</pre>
</div>\n</div>\n`
    },
    {
        id: 'recursion',
        num: 13,
        title: 'Recursion',
        html: `<div class="notes-section">\n<h3 class="notes-section-heading">What is Recursion?</h3>\n<p class="notes-text">Recursion is the process by which a function calls itself. The case where the function doesn't recur is the <strong>base case</strong>, and instances where it keeps calling itself is the <strong>recursive case</strong>.</p>\n<div class="notes-info notes-info-warning">Always define an exit condition (base case) to avoid infinite loops!</div>\n</div>\n<div class="notes-section">\n<h3 class="notes-section-heading">Factorial using Recursion</h3>\n<div class="notes-code-wrapper">
<div class="notes-code-header">
<span class="notes-code-lang">C</span>
<button class="notes-copy-btn" onclick="copyNoteCode(this)" data-code-id="note-code-42">
<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="9" y="9" width="13" height="13" rx="2" ry="2"/><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"/></svg>
Copy
</button>
</div>
<pre class="notes-code-content" id="note-code-42">#include &lt;stdio.h&gt;
int fact(int n) {
    if (n == 0) return 0;
    else if (n == 1) return 1;
    else return n * fact(n - 1);
}
int main() {
    int n;
    printf("Enter a number: ");
    scanf("%d", &amp;n);
    printf("Factorial = %d", fact(n));
    return 0;
}</pre>
</div>\n</div>\n<div class="notes-section">\n<h3 class="notes-section-heading">Fibonacci using Recursion</h3>\n<div class="notes-code-wrapper">
<div class="notes-code-header">
<span class="notes-code-lang">C</span>
<button class="notes-copy-btn" onclick="copyNoteCode(this)" data-code-id="note-code-43">
<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="9" y="9" width="13" height="13" rx="2" ry="2"/><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"/></svg>
Copy
</button>
</div>
<pre class="notes-code-content" id="note-code-43">#include &lt;stdio.h&gt;
int fibonacci(int n) {
    if (n == 0) return 0;
    else if (n == 1) return 1;
    else return fibonacci(n - 1) + fibonacci(n - 2);
}
int main() {
    int n;
    printf("Enter the value of n: ");
    scanf("%d", &amp;n);
    printf("%d", fibonacci(n));
    return 0;
}</pre>
</div>\n</div>\n`
    },
    {
        id: 'enums',
        num: 14,
        title: 'Enums & Typecasting',
        html: `<div class="notes-section">\n<h3 class="notes-section-heading">Enumerations (enum)</h3>\n<p class="notes-text">An <code>enum</code> is a user-defined datatype consisting of a set of named integer constants. Enumerator values start at 0 by default.</p>\n<div class="notes-code-wrapper">
<div class="notes-code-header">
<span class="notes-code-lang">C</span>
<button class="notes-copy-btn" onclick="copyNoteCode(this)" data-code-id="note-code-44">
<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="9" y="9" width="13" height="13" rx="2" ry="2"/><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"/></svg>
Copy
</button>
</div>
<pre class="notes-code-content" id="note-code-44">enum textEditor {
    BOLD = 1,
    ITALIC = 2,
    UNDERLINE = 3
};</pre>
</div>\n</div>\n<div class="notes-section">\n<h3 class="notes-section-heading">Using enum with switch</h3>\n<div class="notes-code-wrapper">
<div class="notes-code-header">
<span class="notes-code-lang">C</span>
<button class="notes-copy-btn" onclick="copyNoteCode(this)" data-code-id="note-code-45">
<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="9" y="9" width="13" height="13" rx="2" ry="2"/><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"/></svg>
Copy
</button>
</div>
<pre class="notes-code-content" id="note-code-45">#include &lt;stdio.h&gt;
enum textEditor {
    BOLD = 1,
    ITALIC = 2,
    UNDERLINE = 3
};
int main() {
    enum textEditor feature = ITALIC;
    switch (feature) {
        case BOLD:      printf("BOLD"); break;
        case ITALIC:    printf("ITALIC"); break;
        case UNDERLINE: printf("UNDERLINE"); break;
    }
    return 0;
}</pre>
</div>\n</div>\n<div class="notes-section">\n<h3 class="notes-section-heading">Type Casting</h3>\n<p class="notes-text"><strong>Implicit (automatic):</strong> The compiler automatically converts one type to another.<br><strong>Explicit (manual):</strong> The programmer specifies the conversion using cast operator.</p>\n<div class="notes-code-wrapper">
<div class="notes-code-header">
<span class="notes-code-lang">C</span>
<button class="notes-copy-btn" onclick="copyNoteCode(this)" data-code-id="note-code-46">
<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="9" y="9" width="13" height="13" rx="2" ry="2"/><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"/></svg>
Copy
</button>
</div>
<pre class="notes-code-content" id="note-code-46">// Implicit type casting
int a = 10;
float b = a;  // int to float automatically

// Explicit type casting
float x = 9.7;
int y = (int)x;  // y = 9 (decimal truncated)</pre>
</div>\n</div>\n`
    },
    {
        id: 'pointers',
        num: 15,
        title: 'Pointers',
        html: `<div class="notes-section">\n<h3 class="notes-section-heading">What is a Pointer?</h3>\n<p class="notes-text">A pointer is a variable that stores the <strong>memory address</strong> of another variable. The <code>*</code> operator is used to declare pointers and dereference them. The <code>&</code> operator gives the address of a variable.</p>\n<div class="notes-code-wrapper">
<div class="notes-code-header">
<span class="notes-code-lang">C</span>
<button class="notes-copy-btn" onclick="copyNoteCode(this)" data-code-id="note-code-47">
<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="9" y="9" width="13" height="13" rx="2" ry="2"/><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"/></svg>
Copy
</button>
</div>
<pre class="notes-code-content" id="note-code-47">#include &lt;stdio.h&gt;
int main() {
    int x = 10;
    int *ptr = &amp;x;  // ptr stores address of x
    printf("Value of x: %d
", x);
    printf("Address of x: %p
", &amp;x);
    printf("Value of ptr: %p
", ptr);
    printf("Value at ptr: %d
", *ptr);
    return 0;
}</pre>
</div>\n</div>\n<div class="notes-section">\n<h3 class="notes-section-heading">Types of Pointers</h3>\n<ul class="notes-list">\n<li><strong>Void Pointer</strong> — can point to any data type: <code>void *ptr;</code></li>\n<li><strong>NULL Pointer</strong> — points to nothing: <code>int *ptr = NULL;</code></li>\n<li><strong>Dangling Pointer</strong> — points to freed/deallocated memory.</li>\n<li><strong>Wild Pointer</strong> — uninitialized pointer (points to random location).</li>\n<li><strong>Function Pointer</strong> — points to a function.</li>\n<li><strong>Pointer to Pointer</strong> — stores address of another pointer: <code>int **pptr;</code></li>\n</ul>\n</div>\n<div class="notes-section">\n<h3 class="notes-section-heading">Pointer Arithmetic</h3>\n<p class="notes-text">You can perform arithmetic operations on pointers: increment (++), decrement (--), addition (+), subtraction (-).</p>\n<div class="notes-code-wrapper">
<div class="notes-code-header">
<span class="notes-code-lang">C</span>
<button class="notes-copy-btn" onclick="copyNoteCode(this)" data-code-id="note-code-48">
<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="9" y="9" width="13" height="13" rx="2" ry="2"/><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"/></svg>
Copy
</button>
</div>
<pre class="notes-code-content" id="note-code-48">#include &lt;stdio.h&gt;
int main() {
    int arr[] = {10, 20, 30, 40, 50};
    int *ptr = arr;
    printf("%d
", *ptr);       // 10
    printf("%d
", *(ptr + 1)); // 20
    printf("%d
", *(ptr + 2)); // 30
    ptr++;
    printf("%d
", *ptr);       // 20
    return 0;
}</pre>
</div>\n</div>\n<div class="notes-section">\n<h3 class="notes-section-heading">Pointers and Arrays</h3>\n<p class="notes-text">The name of an array is a pointer to its first element.</p>\n<div class="notes-code-wrapper">
<div class="notes-code-header">
<span class="notes-code-lang">C</span>
<button class="notes-copy-btn" onclick="copyNoteCode(this)" data-code-id="note-code-49">
<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="9" y="9" width="13" height="13" rx="2" ry="2"/><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"/></svg>
Copy
</button>
</div>
<pre class="notes-code-content" id="note-code-49">#include &lt;stdio.h&gt;
int main() {
    int arr[] = {1, 2, 3, 4, 5};
    int *ptr = arr;  // same as &amp;arr[0]
    for (int i = 0; i &lt; 5; i++) {
        printf("arr[%d] = %d
", i, *(ptr + i));
    }
    return 0;
}</pre>
</div>\n</div>\n<div class="notes-section">\n<h3 class="notes-section-heading">Passing Pointers to Functions</h3>\n<div class="notes-code-wrapper">
<div class="notes-code-header">
<span class="notes-code-lang">C</span>
<button class="notes-copy-btn" onclick="copyNoteCode(this)" data-code-id="note-code-50">
<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="9" y="9" width="13" height="13" rx="2" ry="2"/><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"/></svg>
Copy
</button>
</div>
<pre class="notes-code-content" id="note-code-50">#include &lt;stdio.h&gt;
void addOne(int *ptr) {
    (*ptr)++;  // modifies original value
}
int main() {
    int num = 5;
    addOne(&amp;num);
    printf("num = %d", num);  // num = 6
    return 0;
}</pre>
</div>\n</div>\n`
    },
    {
        id: 'macros',
        num: 16,
        title: 'Macros (#define)',
        html: `<div class="notes-section">\n<h3 class="notes-section-heading">Preprocessor Directives</h3>\n<p class="notes-text">The <code>#define</code> directive creates a macro — a fragment of code given a name. Before compilation, the preprocessor replaces all occurrences of the macro name with its definition.</p>\n<div class="notes-code-wrapper">
<div class="notes-code-header">
<span class="notes-code-lang">C</span>
<button class="notes-copy-btn" onclick="copyNoteCode(this)" data-code-id="note-code-51">
<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="9" y="9" width="13" height="13" rx="2" ry="2"/><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"/></svg>
Copy
</button>
</div>
<pre class="notes-code-content" id="note-code-51">#define PI 3.14159
#define AREA(r) (PI * (r) * (r))

#include &lt;stdio.h&gt;
int main() {
    float radius = 5.0;
    printf("Area = %.2f", AREA(radius));
    return 0;
}</pre>
</div>\n</div>\n<div class="notes-section">\n<h3 class="notes-section-heading">Macro with Arguments</h3>\n<div class="notes-code-wrapper">
<div class="notes-code-header">
<span class="notes-code-lang">C</span>
<button class="notes-copy-btn" onclick="copyNoteCode(this)" data-code-id="note-code-52">
<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="9" y="9" width="13" height="13" rx="2" ry="2"/><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"/></svg>
Copy
</button>
</div>
<pre class="notes-code-content" id="note-code-52">#define MAX(a, b) ((a) &gt; (b) ? (a) : (b))
#define MIN(a, b) ((a) &lt; (b) ? (a) : (b))

#include &lt;stdio.h&gt;
int main() {
    printf("Max of 10, 20 = %d
", MAX(10, 20));
    printf("Min of 10, 20 = %d
", MIN(10, 20));
    return 0;
}</pre>
</div>\n<div class="notes-info notes-info-warning">Always wrap macro parameters in parentheses to avoid unexpected behavior due to operator precedence.</div>\n</div>\n`
    },
    {
        id: 'funcptr',
        num: 17,
        title: 'Function Pointers',
        html: `<div class="notes-section">\n<h3 class="notes-section-heading">What are Function Pointers?</h3>\n<p class="notes-text">Function pointers store the address of a function and can be used to call functions indirectly. They are declared with the asterisk symbol and function parameters.</p>\n<div class="notes-code-wrapper">
<div class="notes-code-header">
<span class="notes-code-lang">C</span>
<button class="notes-copy-btn" onclick="copyNoteCode(this)" data-code-id="note-code-53">
<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="9" y="9" width="13" height="13" rx="2" ry="2"/><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"/></svg>
Copy
</button>
</div>
<pre class="notes-code-content" id="note-code-53">#include &lt;stdio.h&gt;

int add(int a, int b) { return a + b; }
int sub(int a, int b) { return a - b; }

int main() {
    // Declare function pointer
    int (*operation)(int, int);

    operation = add;
    printf("Add: %d
", operation(10, 5));  // 15

    operation = sub;
    printf("Sub: %d
", operation(10, 5));  // 5

    return 0;
}</pre>
</div>\n</div>\n<div class="notes-section">\n<h3 class="notes-section-heading">Array of Function Pointers</h3>\n<div class="notes-code-wrapper">
<div class="notes-code-header">
<span class="notes-code-lang">C</span>
<button class="notes-copy-btn" onclick="copyNoteCode(this)" data-code-id="note-code-54">
<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="9" y="9" width="13" height="13" rx="2" ry="2"/><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"/></svg>
Copy
</button>
</div>
<pre class="notes-code-content" id="note-code-54">#include &lt;stdio.h&gt;

int add(int a, int b) { return a + b; }
int sub(int a, int b) { return a - b; }
int mul(int a, int b) { return a * b; }

int main() {
    int (*operation[3])(int, int) = {add, sub, mul};
    int a = 10, b = 5;

    for (int i = 0; i &lt; 3; i++) {
        printf("Result: %d
", operation[i](a, b));
    }
    return 0;
}</pre>
</div>\n</div>\n`
    },
    {
        id: 'structures',
        num: 18,
        title: 'Structures',
        html: `<div class="notes-section">\n<h3 class="notes-section-heading">What is a Structure?</h3>\n<p class="notes-text">A structure is a user-defined data type that groups related variables of different types under one name.</p>\n<div class="notes-code-wrapper">
<div class="notes-code-header">
<span class="notes-code-lang">C</span>
<button class="notes-copy-btn" onclick="copyNoteCode(this)" data-code-id="note-code-55">
<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="9" y="9" width="13" height="13" rx="2" ry="2"/><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"/></svg>
Copy
</button>
</div>
<pre class="notes-code-content" id="note-code-55">#include &lt;stdio.h&gt;
struct employee {
    int id;
    char name[50];
    float salary;
};

int main() {
    struct employee emp1;
    emp1.id = 1;
    emp1.salary = 50000.0;
    printf("ID: %d
", emp1.id);
    printf("Salary: %.2f
", emp1.salary);
    return 0;
}</pre>
</div>\n</div>\n<div class="notes-section">\n<h3 class="notes-section-heading">Passing Structure to Function</h3>\n<div class="notes-code-wrapper">
<div class="notes-code-header">
<span class="notes-code-lang">C</span>
<button class="notes-copy-btn" onclick="copyNoteCode(this)" data-code-id="note-code-56">
<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="9" y="9" width="13" height="13" rx="2" ry="2"/><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"/></svg>
Copy
</button>
</div>
<pre class="notes-code-content" id="note-code-56">#include &lt;stdio.h&gt;
struct student {
    char name[50];
    int marks;
};

void display(struct student s) {
    printf("Name: %s
", s.name);
    printf("Marks: %d
", s.marks);
}

int main() {
    struct student s1 = {"John", 85};
    display(s1);
    return 0;
}</pre>
</div>\n</div>\n<div class="notes-section">\n<h3 class="notes-section-heading">Array of Structures</h3>\n<div class="notes-code-wrapper">
<div class="notes-code-header">
<span class="notes-code-lang">C</span>
<button class="notes-copy-btn" onclick="copyNoteCode(this)" data-code-id="note-code-57">
<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="9" y="9" width="13" height="13" rx="2" ry="2"/><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"/></svg>
Copy
</button>
</div>
<pre class="notes-code-content" id="note-code-57">#include &lt;stdio.h&gt;
struct student {
    char firstname[50];
    char lastname[50];
    char id[20];
    int score;
};

int main() {
    struct student stdArr[3];
    int i;
    // Input
    for (i = 0; i &lt; 3; i++) {
        printf("Enter First Name: ");
        scanf("%s", stdArr[i].firstname);
        printf("Enter Score: ");
        scanf("%d", &amp;stdArr[i].score);
    }
    // Output
    for (i = 0; i &lt; 3; i++) {
        printf("Student #%d: %s, Score: %d
",
               i + 1, stdArr[i].firstname, stdArr[i].score);
    }
    return 0;
}</pre>
</div>\n</div>\n<div class="notes-section">\n<h3 class="notes-section-heading">Nested Structures</h3>\n<div class="notes-code-wrapper">
<div class="notes-code-header">
<span class="notes-code-lang">C</span>
<button class="notes-copy-btn" onclick="copyNoteCode(this)" data-code-id="note-code-58">
<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="9" y="9" width="13" height="13" rx="2" ry="2"/><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"/></svg>
Copy
</button>
</div>
<pre class="notes-code-content" id="note-code-58">#include &lt;stdio.h&gt;
struct Address {
    char city[50];
    int pin;
};

struct Employee {
    int id;
    char name[50];
    struct Address addr;  // nested structure
};

int main() {
    struct Employee e = {1, "John", {"Delhi", 110001}};
    printf("Name: %s
", e.name);
    printf("City: %s
", e.addr.city);
    printf("PIN: %d
", e.addr.pin);
    return 0;
}</pre>
</div>\n</div>\n`
    },
    {
        id: 'unions',
        num: 19,
        title: 'Unions & Typedef',
        html: `<div class="notes-section">\n<h3 class="notes-section-heading">typedef</h3>\n<p class="notes-text">The <code>typedef</code> keyword provides alternative names for existing data types, making code cleaner and more readable.</p>\n<div class="notes-code-wrapper">
<div class="notes-code-header">
<span class="notes-code-lang">C</span>
<button class="notes-copy-btn" onclick="copyNoteCode(this)" data-code-id="note-code-59">
<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="9" y="9" width="13" height="13" rx="2" ry="2"/><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"/></svg>
Copy
</button>
</div>
<pre class="notes-code-content" id="note-code-59">#include &lt;stdio.h&gt;
typedef struct {
    int x;
    int y;
} Point;

int main() {
    Point p1;
    p1.x = 1;
    p1.y = 3;
    printf("%d, %d
", p1.x, p1.y);
    return 0;
}</pre>
</div>\n</div>\n<div class="notes-section">\n<h3 class="notes-section-heading">What is a Union?</h3>\n<p class="notes-text">A union is a user-defined data type where all members <strong>share the same memory location</strong>. Only one member can contain a value at a time. The size of a union equals the size of its largest member.</p>\n<div class="notes-code-wrapper">
<div class="notes-code-header">
<span class="notes-code-lang">C</span>
<button class="notes-copy-btn" onclick="copyNoteCode(this)" data-code-id="note-code-60">
<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="9" y="9" width="13" height="13" rx="2" ry="2"/><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"/></svg>
Copy
</button>
</div>
<pre class="notes-code-content" id="note-code-60">#include &lt;stdio.h&gt;
union abc {
    int a;
    char b;
    float c;
    double d;
};

int main() {
    printf("Size of union abc is %lu", sizeof(union abc));
    // Output: 8 (size of double, the largest member)
    return 0;
}</pre>
</div>\n</div>\n<div class="notes-section">\n<h3 class="notes-section-heading">Union vs Structure</h3>\n<p class="notes-text">In a <strong>struct</strong>, each member has its own memory. In a <strong>union</strong>, all members share the same memory, saving space but only one member can hold a value at a time.</p>\n<div class="notes-code-wrapper">
<div class="notes-code-header">
<span class="notes-code-lang">C</span>
<button class="notes-copy-btn" onclick="copyNoteCode(this)" data-code-id="note-code-61">
<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="9" y="9" width="13" height="13" rx="2" ry="2"/><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"/></svg>
Copy
</button>
</div>
<pre class="notes-code-content" id="note-code-61">#include &lt;stdio.h&gt;
union abc {
    int a;
    char b;
} var;

struct abc1 {
    int a;
    char b;
} var1;

int main() {
    var.a = 66;
    printf("union a = %d
", var.a);  // 66
    printf("union b = %c
", var.b);  // B (ASCII 66)

    var1.a = 100;
    var1.b = 'Q';
    printf("struct a = %d
", var1.a);  // 100
    printf("struct b = %c
", var1.b);  // Q
    return 0;
}</pre>
</div>\n</div>\n<div class="notes-section">\n<h3 class="notes-section-heading">Practical Use of Unions</h3>\n<p class="notes-text">Unions save memory when you have a type that can be one of several variants. For example, a store that sells both books and shirts:</p>\n<div class="notes-code-wrapper">
<div class="notes-code-header">
<span class="notes-code-lang">C</span>
<button class="notes-copy-btn" onclick="copyNoteCode(this)" data-code-id="note-code-62">
<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="9" y="9" width="13" height="13" rx="2" ry="2"/><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"/></svg>
Copy
</button>
</div>
<pre class="notes-code-content" id="note-code-62">#include &lt;stdio.h&gt;
struct store {
    double price;
    union {
        struct {
            char *title;
            char *author;
            int number_pages;
        } book;
        struct {
            int color;
            int size;
            char *design;
        } shirt;
    } item;
};

int main() {
    struct store s;
    s.item.book.title = "C programming";
    s.item.book.author = "John";
    s.item.book.number_pages = 189;
    printf("Size is %lu
", sizeof(s));  // 32 (vs 48 with struct)
    return 0;
}</pre>
</div>\n</div>\n`
    },
];
