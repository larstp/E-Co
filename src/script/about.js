document.addEventListener("DOMContentLoaded", () => {
  const main = document.createElement("main");
  main.className = "about-main";
  main.setAttribute("role", "main");

  const leftDiv = document.createElement("div");
  leftDiv.className = "about-main-left";
  const left = document.createElement("section");
  left.className = "about-info";

  const title = document.createElement("h1");
  title.className = "about-title";
  title.textContent = "E-co";

  const tagline = document.createElement("h2");
  tagline.className = "about-tagline";
  tagline.textContent = "Conscious Commerce. Effortless Experience.";

  const desc = document.createElement("p");
  desc.className = "about-desc";
  desc.textContent =
    "E-co is a modern, climate-conscious e-commerce brand offering a curated range of high-quality products. Our mission is to redefine online shopping by providing a seamless, sustainable experience for modern consumers.";

  const missionH3 = document.createElement("h3");
  missionH3.textContent = "Mission";
  const missionP = document.createElement("p");
  missionP.textContent =
    "To redefine online shopping by offering a meticulously curated selection of products and an exceptional, effortless user experience, making us the trusted single-source destination for modern consumers who value both quality and sustainability.";

  const visionH3 = document.createElement("h3");
  visionH3.textContent = "Vision";
  const visionP = document.createElement("p");
  visionP.textContent =
    "To become the leading global e-commerce platform recognized for our innovative approach to retail, our unwavering commitment to quality, and our deep understanding of both consumer needs and our environmental responsibility.";

  const offerH3 = document.createElement("h3");
  offerH3.textContent = "What We Offer";
  const offerUl = document.createElement("ul");
  offerUl.className = "about-categories";
  [
    [
      "E-co Electronics:",
      "Latest consumer tech, smart devices, audio equipment.",
    ],
    ["E-co Lifestyle:", "Contemporary apparel and accessories."],
    [
      "E-co Home & Living:",
      "Kitchen gadgets, cleaning tools, furniture, decor.",
    ],
    ["E-co Wellness:", "Fitness gear, wearable tech, supplements, self-care."],
  ].forEach(([strong, text]) => {
    const li = document.createElement("li");
    const strongEl = document.createElement("strong");
    strongEl.textContent = strong;
    li.appendChild(strongEl);
    li.appendChild(document.createTextNode(" " + text));
    offerUl.appendChild(li);
  });

  const valuesH3 = document.createElement("h3");
  valuesH3.textContent = "Our Values";
  const valuesUl = document.createElement("ul");
  valuesUl.className = "about-values";
  [
    "Quality & Sustainability",
    "Customer Satisfaction",
    "Environmental Stewardship",
    "Effortless Experience",
  ].forEach((val) => {
    const li = document.createElement("li");
    li.textContent = val;
    valuesUl.appendChild(li);
  });

  left.appendChild(title);
  left.appendChild(tagline);
  left.appendChild(desc);
  left.appendChild(missionH3);
  left.appendChild(missionP);
  left.appendChild(visionH3);
  left.appendChild(visionP);
  left.appendChild(offerH3);
  left.appendChild(offerUl);
  left.appendChild(valuesH3);
  left.appendChild(valuesUl);
  leftDiv.appendChild(left);

  const rightDiv = document.createElement("div");
  rightDiv.className = "about-main-right";
  const right = document.createElement("section");
  right.className = "about-logo";
  const logo = document.createElement("img");
  logo.src = "/public/assets/img/logo/logo.webp";
  logo.alt = "E-co logo";
  logo.className = "about-logo-img";
  right.appendChild(logo);
  rightDiv.appendChild(right);

  main.appendChild(leftDiv);
  main.appendChild(rightDiv);
  document.body.append(main);
  import("./utils/footer.js").then((mod) => {
    const footer = mod.buildFooter();
    document.body.append(footer);
  });
});
