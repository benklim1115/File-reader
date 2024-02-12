/* Live with the DOM

const fileUpload = document.querySelector("#fileInput");

//on change/file upload create a file, if we have fileData create a reader object to help read it
fileUpload.addEventListener("change", function(event) {
    const file = event.target.files[0];
    if (file) {
        const reader = new FileReader();
        reader.onload = function(e) {
            const fileContents = e.target.result;

            //split lines up by new lines to get each line as an element in an array
            const lines = fileContents.split(/\r?\n/);

            //we need to go through and split the lines up by number and text
            const sortedLines = lines.map(line => {
                //split by space
                const parts = line.split(" ");

                //return object with a number key and text key with corresponding values of parts
                //0 is the number for each object and 1 is the text
                //sort by ascending numbers
                return {number: parseInt(parts[0], 10), text: parts[1]};
            }).sort((a, b) => a.number - b.number);

            //join lines back together with a line break
            const sortedList = sortedLines.map(line => `${line.number} ${line.text}`).join("\n");

            console.log(sortedList);
            document.querySelector("#output").textContent = sortedList;
        }
        reader.readAsText(file);
    }
});
*/



/* Functional Programming */

//handle the file
function handleFileUpload(event) {
    const file = event.target.files[0];

    if (!file) {
        return;
    }

    const reader = new FileReader();

    reader.onload = function (e) {
        const fileContents = e.target.result;

        const sortedList = decode(fileContents);

        console.log(sortedList);
        document.querySelector("#output").textContent = sortedList;
    };

    reader.readAsText(file);
}

//sort the file and arrange it in order by number
function decode(message_file) {
    const lines = message_file.split(/\r?\n/);

    const sortedLines = lines.map((line) => {
        const [number, text] = line.split(" ");
        return { number: parseInt(number, 10), text };
    }).sort((a, b) => a.number - b.number);

    return sortedLines.map((line) => `${line.number} ${line.text}`).join("\n");
}

const fileUpload = document.querySelector("#fileInput");
fileUpload.addEventListener("change", handleFileUpload);

