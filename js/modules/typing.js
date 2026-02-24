// js/modules/typing.js
export const initTyping = () => {
  const text = "Guiding with purpose and integrity.";
  let index = 0;
  const speed = 120;

  const target = document.getElementById("typing-text");
  if (!target) return;

  const type = () => {
    if (index < text.length) {
      target.textContent += text.charAt(index);
      index++;
      setTimeout(type, speed);
    }
  };

  type(); 
};
