"use strict";

import galleryItems from "./gallery-items.js";
const galleryList = document.querySelector(".gallery");
const lightboxDiv = document.querySelector(".lightbox");
const lightboxDivOverlay = document.querySelector(".lightbox__content");
const closeBtn = document.querySelector('button[data-action="close-lightbox"]');

galleryList.addEventListener("click", openLightbox);
closeBtn.addEventListener("click", closeLightbox);
lightboxDivOverlay.addEventListener("click", handleLightboxClick);

function createGalleryItem(img) {
  const galleryItem = `<li class="gallery__item">
  <a
    class="gallery__link"
    href="${img.original}"
  >
    <img
      class="gallery__image"
      src="${img.preview}"
      data-source="${img.original}"
      alt="${img.description}"
    />

    <span class="gallery__icon">
      <i class="material-icons">zoom_out_map</i>
    </span>
  </a>
</li>`;
  return galleryItem;
}

function createGalleryList(imgArray) {
  imgArray.forEach(img => {
    galleryList.insertAdjacentHTML("afterbegin", createGalleryItem(img));
  });
}

createGalleryList(galleryItems);

function openLightbox(event) {
  event.preventDefault();
  window.addEventListener("keydown", handleKey);

  lightboxDiv.classList.add("is-open");
  const lightboxImage = document.querySelector(".lightbox___image");
  const imgSource = event.target.dataset.source;
  lightboxImage.setAttribute("src", `${imgSource}`);
}
function closeLightbox() {
  lightboxDiv.classList.remove("is-open");
  window.removeEventListener("keydown", handleKey);
}
function handleLightboxClick(event) {
  if (event.target !== event.currentTarget) {
    return;
  }
  closeLightbox();
}

function handleKey(event) {
  if (event.code !== "Escape") {
    return;
  }
  closeLightbox()
}
