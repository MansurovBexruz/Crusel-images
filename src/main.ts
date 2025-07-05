const images = document.querySelectorAll("img");
const imageBox = document.querySelector(".onclick-image") as HTMLDivElement;
const nextBtn = document.querySelector(".next") as HTMLButtonElement;
const prevBtn = document.querySelector(".prev") as HTMLButtonElement;

let currentImageIndex = 0;
let currentImage: HTMLImageElement | null = null;

// Rasmlarni array shaklida saqlash
const imageUrls = Array.from(images).map(img => img.src);

// Modal ichidagi rasmni yangilash funksiyasi
function updateModalImage(index: number) {
  // Avvalgi rasmni o'chirish
  if (currentImage) {
    currentImage.remove();
  }
  
  // Yangi rasm yaratish
  currentImage = document.createElement("img") as HTMLImageElement;
  currentImage.src = imageUrls[index];
  currentImage.style.width = "700px";
  currentImage.style.height = "400px";
  currentImage.style.objectFit = "cover";
  currentImage.style.borderRadius = "10px";
  
  // Rasmni modal ichiga qo'shish
  imageBox.appendChild(currentImage);
}

// Rasmga bosilganda modal ochish
images.forEach((img, idx) => {
  img.addEventListener("click", () => {
    currentImageIndex = idx;
    
    // Modal ko'rsatish
    imageBox.style.display = "flex";
    imageBox.style.justifyContent = "center";
    imageBox.style.alignItems = "center";
    
    // Rasmni modal ichiga yuklash
    updateModalImage(currentImageIndex);
  });
});

// Next button funksiyasi
nextBtn.addEventListener("click", (e) => {
  e.stopPropagation(); // Modal yopilishini oldini olish
  
  currentImageIndex = (currentImageIndex + 1) % imageUrls.length;
  updateModalImage(currentImageIndex);
});

// Previous button funksiyasi
prevBtn.addEventListener("click", (e) => {
  e.stopPropagation(); // Modal yopilishini oldini olish
  
  currentImageIndex = (currentImageIndex - 1 + imageUrls.length) % imageUrls.length;
  updateModalImage(currentImageIndex);
});

// Modal yopish (faqat modal background bosilganda)
imageBox.addEventListener("click", (e) => {
  // Agar rasm yoki buttonlarga bosilsa modal yopilmasin
  if (e.target === imageBox) {
    imageBox.style.display = "none";  
  }
});