const observingTargets = document.querySelectorAll("main section");

const toggleTargets = document.querySelectorAll("aside>ol>a");

const pageBtnMap = new Map();
const setPageBtnMap = () => {
  observingTargets.forEach((eachTargets, idx) => {
    pageBtnMap.set(eachTargets, toggleTargets[idx]);
  });
};

setPageBtnMap();

let lastBtn;

const margin = ["0px", "-90%"];

const visualizingMargin = () => {
  let topMargin = document.createElement("div");
  topMargin.style.cssText =
    "position:fixed; top:" +
    margin[0].substring(1) +
    "; left:0; right:0; height:1px; background-color:red; z-index :3";

  let bottomMargin = document.createElement("div");
  bottomMargin.style.cssText =
    "position:fixed; bottom:" +
    margin[1].substring(1) +
    "; left:0; right:0; height:1px; background-color:blue; z-index :3;";

  document.body.append(topMargin);
  document.body.append(bottomMargin);
};

visualizingMargin();

const whenTargetInView = (entities, observer) => {
  entities.forEach((eachEntity) => {
    if (eachEntity.isIntersecting) {
      //   console.log("isIn!", eachEntity.target);
      const pairedTarget = pageBtnMap.get(eachEntity.target);
      console.log(pairedTarget);
      const finalTarget = pairedTarget.querySelector("li");
      finalTarget.classList.add("pressed");
      lastBtn?.classList.remove("pressed");
      lastBtn = finalTarget;
    } else {
      //   console.log("isOut!", eachEntity.target);
    }
  });
};

const observer = new IntersectionObserver(whenTargetInView, {
  root: null,
  rootMargin: margin[0] + " 0px " + margin[1] + " 0px",
  threshold: [0],
});

observingTargets.forEach((eachTarget) => {
  observer.observe(eachTarget);
});
