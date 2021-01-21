const inquirer = require("inquirer");
const fs = require("fs");

// Define and ask the questions
inquirer
  .prompt([
    {
      type: "input",
      name: "title",
      message: "What is title of your project?:",
    },
    {
      type: "input",
      name: "description",
      message: "What is the description of your project?:",
    },
    {
      type: "editor",
      name: "tableContents",
      message: "Table of Contents:",
    },
    {
      type: "input",
      name: "installation",
      message: "Installation intructions:",
    },
    {
      type: "input",
      name: "usage",
      message: "Usage instructions of your project:",
    },
    {
      type: "list",
      name: "license",
      message: "Lincense of your project?:",
      choices: ["MIT", "OpenSource"],
    },
    {
      type: "input",
      name: "contributors",
      message: "Contributors:",
    },
    {
      type: "input",
      name: "tests",
      message: "What Tests are required to run your project?:",
    },
    {
      type: "input",
      name: "github",
      message: "GitHub User:",
    },
    {
      type: "input",
      name: "githubProfile",
      message: "GitHub Profile link:",
    },
  ])
  .then((data) => {
    // console.log(data);

    // Creates the name STRING only of the file to be used later
    const filename = `${data.title.toLowerCase().split(" ").join("")}.md`;

    // Defining all the sections with markdown syntax included
    function title(title) {
      return `# **${title}** \n\n`;
    }

    function licenseBadge(license) {
      // Assign icon depending on user selection
      switch (license) {
        case "MIT":
          license = `![alt text](./icons/firewall.png "MIT License")`;
          break;
        case "OpenSource":
          license = `![alt text](./icons/int.png "OpenSource License")`;
          break;
        default:
          license = "No license provided";
      }

      return `\n${license} \n\n`;
    }

    function description(description) {
      return `### **Description** \n${description} \n\n`;
    }

    function tableContents(tableContents) {
      return `### **Table of Contents** \n${tableContents} \n\n`;
    }

    function installation(installation) {
      return `### **Installation** \n${installation} \n\n`;
    }

    function license(license) {
      return `### **License** \n${license} \n\n`;
    }

    function contributors(contributors) {
      return `### **Contributors** \n${contributors} \n\n`;
    }

    function tests(tests) {
      return `### **Tests** \n${tests} \n\n`;
    }

    function questions(github, githubProfile) {
      return `### **Questions?** \n\nReach out to **${github}** on github at: \n [${githubProfile}](${githubProfile}) \n\n`;
    }


    // Putting it all together with a TEMPLATE LITERAL
    var fileContent = `${title(data.title)} ${licenseBadge(data.license)} ${description(data.description)} ${tableContents(data.tableContents)} ${installation(data.installation)} ${license(data.license)} ${contributors(data.contributors)} ${tests(data.tests)} ${questions(data.github, data.githubProfile)}`;

    // Create the file on the system with the content the user entered
    fs.writeFile(filename, fileContent, (err) =>
      err ? console.log(err) : console.log("README file created successfully!")
    );
  })

  .catch((error) => {
    if (error) {
      console.log(error);
    }
  });
