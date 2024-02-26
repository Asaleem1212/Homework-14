// Use const for the URL since it's not meant to change.
const url = "https://2u-data-curriculum-team.s3.amazonaws.com/dataviz-classroom/v1.1/14-Interactive-Web-Visualizations/02-Homework/samples.json";

// Use a function to handle data loading and initialization.
function initializeDashboard() {
    d3.json(url).then(function(data) {
        // Store the data in a global variable for later use.
        window.dataSet = data;
        
        // Initialize the dashboard with the first item.
        var firstItem = data.names[0];
        populateDropdown(data.names);
        buildBarChart(firstItem);
        buildBubbleChart(firstItem);
        buildMetaData(firstItem);
    });
}

function populateDropdown(names) {
    var dropdownSelect = document.getElementById("selDataset");
    names.forEach(function(name) {
        var optElem = document.createElement("option");
        optElem.textContent = name;
        optElem.value = name;
        dropdownSelect.appendChild(optElem);
    });
}

function buildBarChart(itemid) {
    var sampleFilter = dataSet.samples.filter(sampleObject => sampleObject.id == itemid)[0];
    var dataBar = [{
        x: sampleFilter.sample_values.slice(0, 10).reverse(),
        y: sampleFilter.otu_ids.slice(0, 10).map(val => `OTU ${val}`).reverse(),
        type: 'bar',
        orientation: "h",
        text: sampleFilter.otu_labels.slice(0, 10).reverse()
    }];
    
    // Define a layout for the bar chart
    var barLayout = {
        title: "Top 10 OTUs",
        xaxis: { title: "Sample Values" },
        yaxis: { title: "OTU IDs" }
    };

    Plotly.newPlot("bar", dataBar, barLayout);
}

function buildBubbleChart(itemid) {
    var sampleFilter = dataSet.samples.filter(sampleObject => sampleObject.id == itemid)[0];
    var layoutBubble = { title: "Belly Button Biodiversity", xaxis: { title: "OTU ID" } };
    var dataBubble = [{
        x: sampleFilter.otu_ids,
        y: sampleFilter.sample_values,
        text: sampleFilter.otu_labels,
        mode: "markers",
        marker: {
            size: sampleFilter.sample_values,
            color: sampleFilter.otu_ids,
            colorscale: "Earth"
        }
    }];
    
    Plotly.newPlot("bubble", dataBubble, layoutBubble);
}

function buildMetaData(itemid) {
    var sampleFilter = dataSet.metadata.filter(sampleObject => sampleObject.id == parseInt(itemid))[0];
    var metadatapanel = d3.select("#sample-metadata");
    metadatapanel.html("");
    Object.entries(sampleFilter).forEach(([key, value]) => {
        metadatapanel.append("h6").text(`${key.toUpperCase()}: ${value}`);
    });
}

// Event handler for the dropdown menu change
function optionChanged(newSample) {
    buildBarChart(newSample);
    buildBubbleChart(newSample);
    buildMetaData(newSample);
    
    // Check if updateGaugeChart is defined before calling it
    if (typeof updateGaugeChart === "function") {
        updateGaugeChart(newSample);
    } else {
        console.error("updateGaugeChart is not defined");
    }
}

// Initialize the dashboard on page load.
window.onload = function() {
    initializeDashboard();
};
