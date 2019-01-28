function createSectionHeading(name){
    let tag=document.createElement("div");
    tag.innerHTML=name;
    tag.classList.add("heading");
    return tag;
}

function createSimpleDiv(content){
    let tag=document.createElement("div");
    tag.innerHTML=content;
    return tag;
}

let child=document.getElementsByClassName("second-section");
child[0].appendChild(createSectionHeading({{data.0.heading}}));


