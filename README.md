# ProjectExam1
NOROFF FED01 Project Exam 01


1. PE Exam 1 Brief
Read
Please read the following instructions carefully. If any part is unclear or you have questions, contact the designated teachers through Microsoft Teams direct message. Discussing the project exam in class channels is strictly prohibited. Additionally, discussions about the exam outside official teacher-student communications, including private messages or in-person conversations with classmates, are not allowed.
If you struggle to understand the Project Exam instructions, contacting your teachers for help is acceptable. Please understand that the teachers cannot give students the answers or step-by-step instructions on implementing the project requirements, as the Course Assignments, Projects, and Exams are graded assessments. Teachers can, however, clarify Course Assignment instructions if needed.
The Project Exam 1 will be graded on an “A to F” scale.
F - 0-39 - Failed the course and have to do a Resit.
E - 40-49
D - 50-59
C - 60-79
B - 80-89
A - 90-100
Learning Outcomes covered in Project Exam 1:
I can plan a web application project.
I can design a UI for a web application.
I can use HTML and CSS to build a web application interface.
I can use JavaScript to interact with API data.
I can use JavaScript to add UI functionality.
I can test a web application using online tools.
I can deploy a web application to a static host.
  
Submission
Your application must be pushed to your GitHub Classroom repository BEFORE the exam deadline.
The link to your repository and your GitHub username must be submitted on Moodle in a .txt file named the following: “FName_LName_PE1_ClassXXYY.txt”
(Replace ‘Class’ with your class, e.g. ‘Aug’, ‘Oct’, etc.)
(Replace ‘XX’ with your class year, e.g. 22, 23) (Replace ‘YY’ with either FT for Fulltime, or PT for Parttime)
EXAMPLE: JOHN_DOE_PE1_JAN25FT.txt


Commits or submissions past the deadline will not be considered for grading.
Late submissions will not be accepted, and there will be no exceptions to this rule.


Failure to submit this file to Moodle OR push (commit) your code to the git classroom will result in a not-passed grade.


Goal
Put into practice the skills learned over the FED1 program. You will demonstrate your ability to:
Interpret a brief
Plan your solution
Design a user interface
Build and test a responsive web application
You are required to use the skills learned this year, including design, HTML, CSS, JavaScript, and project methodology.
Learning Outcomes
I can plan a web application project
I can design a UI for a web application
I can use HTML, CSS, and JavaScript to build a web application interface
I can use JavaScript to interact with API data
I can use JavaScript to add UI functionality
I can test a web application using online tools
I can deploy a web application to a static host
Restrictions
You may only use HTML, CSS, and JavaScript — no CSS or JavaScript frameworks are permitted (including Tailwind, Bootstrap, Vue, Svelte, React, or similar packages).
Permissions
Code borrowed from external sources must be clearly marked with inline comments, including a link to the origin.
Icon and font packs may be used in your project.
Brief
Build a front-end user interface for an existing e-commerce API. The client requires a responsive web application that lets users view products (description, price, rating, and reviews when available), log in to purchase products, and log out after checking out.
Use the owner account you created to test functionality. On submission, your client must be able to register, log in, and purchase products.
Time Commitment
Full-Time: 6 weeks  |  Part-Time: 12 weeks
Client
You may create a fictional client (theme, backstory, and branding of your choosing). Alternatively, use the example below:
Example Client: HotView Labs
Size: 30 employees
Location: Worldwide
Mission: Provide the most accurate and up-to-date insights to tech leaders across the world.
Terminology
User: a person visiting your site who is not logged in.
Owner: the logged-in manager of the shop.
Pages & User Stories
Product Feed Page
GET /online-shop  •  Path: /index.html
Requirements:
An interactive banner carousel showing the 3 latest products (with prev/next controls and looping).
Each carousel item includes a button linking to the specific product page.
A responsive thumbnail grid listing at least 12 latest products.
Each product thumbnail is clickable and links to its product page.
Specific Product Page
GET /online-shop/<id>  •  Path: /product.html
Show title, description, price, discounted price, rating, reviews, and tags (fetched from the API) in a responsive layout.
Include a “share” icon that provides a shareable URL (query string or hash) containing the product ID.
As an owner (when logged in), provide an Add to Cart button.
Account Login Page
POST /auth/login  •  Path: /account/login.html
Validated login form that requests and saves a token to the browser.
Account Register Page
POST /auth/register  •  Path: /account/register.html
Validated register form to create a new account (email and password).
Cart Page
Path: /cart.html
View products in the cart and the total price.
Adjust quantities, clear the cart, and proceed to checkout.
Checkout Page
Path: /checkout.html
Form with various payment methods (does not need to be functional).
Form for delivery address.
Success Page
Path: /success.html
Display a success message after submitting payment and delivery address.
Resources
Make use of the API documentation and Swagger to inform your development process.
Swagger
API Documentation
Process
Create a GitHub repository where you will commit and deploy your code.
Create a Kanban plan using GitHub Projects (include a Roadmap view).
Create a Figma style guide and high-fidelity assets (logo, font pairings, color palette, form states, components such as buttons, list cards, forms, imagery, and icons).
Create a high-fidelity prototype in Figma for desktop and mobile (non-interactive, but representative of the final product with colors and web-optimized images).
Use your plan and design documents to complete user stories; commit to GitHub frequently.
Manually test each user story.
Deploy using a static hosting platform such as GitHub Pages.
Validate HTML, SEO, and WCAG using online tools.
Deliver the required links to your work.
Submission
Save the required links in a Word or .txt file and upload to Moodle:
Link to your GitHub repository
Link to your deployed web application
Link to your Figma style guide
Link to your public project planning board
Admin user login details (email and password) used to test the web application
Submission Access
Test all links in an Incognito window before submission. Inaccessible links will not be graded.
Grading Criteria
Style Guide
Font families are present
Primary and secondary colors are defined
Logo is present
Buttons and common components are present
Theme is well defined
Carefully considered and executed; acceptable at a professional establishment
Design
Hi-fidelity prototype for desktop
Hi-fidelity prototype for mobile devices
Exact replication of the final web application with images
Carefully considered and executed; acceptable at a professional establishment
Planning Documents
GitHub issues include a Kanban board
Tasks have comprehensive titles and detailed descriptions or subtasks
Tasks include start and end dates
Tasks include sizing or estimates
Project meticulously planned, including a Roadmap view
User Stories
All user stories are completed to a high standard.
User Experience
Forms have validation with helpful input guidelines
Clear success/error feedback for actions
Easy to use and navigate (obvious usability)
Loading indicators shown when users must wait
Sensible validation, error handling, and user feedback throughout
Best Practice
Semantic, valid HTML
SEO best practices applied
CSS is DRY
Responsive styling replicates the design
Modular, clean JavaScript
Error handling in place
HTML, JavaScript, and CSS best practices are widely observed
Disclaimer – Appropriate Use of Course Assignments and Tools
By participating in this exam project and utilizing its tools, resources, and assignments, you agree to the following to ensure a respectful, ethical, and legally compliant learning environment:
1. Prohibited Content
Hate speech, including but not limited to racism, sexism, and other discriminatory language
References or promotions of illegal activities, such as drug use or trafficking
Any content suggesting human trafficking, exploitation, pornography, or any form of harm to individuals
2. Legal and Ethical Compliance
Use course-provided platforms (including APIs) in line with applicable laws, ethical standards, and the institution’s code of conduct.
3. Consequences of Violations
Warnings and possible exclusion from the assignment
Incidents may lead to disciplinary action, including removal from the course/institution and notification of relevant authorities
4. Responsibility
Students must exercise good judgment and professionalism. Misuse of tools undermines personal growth and program integrity.
Reminder
Your work represents you and this institution. Creativity, critical thinking, and problem-solving are encouraged—within boundaries of respect, ethics, and legality. Contact your instructor with questions about appropriate use.
Acknowledgment
By continuing with this assignment, you acknowledge that you have read and understood this disclaimer and agree to comply with its terms.

