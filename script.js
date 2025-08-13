// FAQ Data
const faqData = [
  {
    question: "Berapa harga sewa per bulan?",
    answer: "Harga sewa mulai dari Rp 800.000 per bulan sudah termasuk listrik, air, Wi-Fi.",
  },
  {
    question: "Apakah ada deposit?",
    answer: "Ya, deposit sebesar 1 bulan sewa yang akan dikembalikan saat check-out jika tidak ada kerusakan.",
  },
  {
    question: "Fasilitas apa saja yang tersedia?",
    answer: "Kamar dilengkapi dengan kasur, lemari, meja belajar, kamar mandi dalam, AC, dan Wi-Fi gratis.",
  },
  {
    question: "Apakah boleh membawa kendaraan?",
    answer: "Ya, tersedia area parkir motor yang aman dan gratis untuk penghuni kos.",
  },
  {
    question: "Bagaimana sistem keamanan?",
    answer: "Kos dilengkapi dengan CCTV, penjaga 24 jam, dan sistem kunci kartu untuk akses masuk.",
  },
  {
    question: "Apakah ada aturan khusus?",
    answer:
      "Tidak boleh membawa tamu menginap, menjaga kebersihan bersama, dan tidak membuat keributan setelah jam 22.00.",
  },
  {
    question: "Bagaimana cara melakukan pembayaran?",
    answer:
      "Pembayaran dapat dilakukan melalui transfer bank, cash, atau e-wallet. Pembayaran dilakukan setiap tanggal 1 atau sesuai kesepakatan.",
  },
  {
    question: "Apakah bisa kontrak jangka pendek?",
    answer: "Minimal kontrak 3 bulan. Untuk kontrak di bawah 3 bulan akan dikenakan biaya tambahan.",
  },
]

// Global variables
let activeSection = "home"
let openFaqItems = []

// Initialize the website
document.addEventListener("DOMContentLoaded", () => {
  initializeFAQ()
  initializeScrollSpy()
  initializeSmoothScroll()
})

// FAQ Functions
function initializeFAQ() {
  const faqContainer = document.getElementById("faqContainer")

  faqData.forEach((faq, index) => {
    const faqItem = document.createElement("div")
    faqItem.className = "faq-item"

    faqItem.innerHTML = `
            <button class="faq-question" onclick="toggleFaqItem(${index})">
                <h5>${faq.question}</h5>
                <svg class="faq-icon" id="faq-icon-${index}" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <polyline points="6,9 12,15 18,9"></polyline>
                </svg>
            </button>
            <div class="faq-answer" id="faq-answer-${index}">
                <p>${faq.answer}</p>
            </div>
        `

    faqContainer.appendChild(faqItem)
  })
}

function toggleFaqItem(index) {
  const answer = document.getElementById(`faq-answer-${index}`)
  const icon = document.getElementById(`faq-icon-${index}`)

  if (openFaqItems.includes(index)) {
    // Close the item
    answer.classList.remove("active")
    icon.classList.remove("rotated")
    openFaqItems = openFaqItems.filter((item) => item !== index)
  } else {
    // Open the item
    answer.classList.add("active")
    icon.classList.add("rotated")
    openFaqItems.push(index)
  }
}

function expandAllFaq() {
  faqData.forEach((_, index) => {
    const answer = document.getElementById(`faq-answer-${index}`)
    const icon = document.getElementById(`faq-icon-${index}`)

    answer.classList.add("active")
    icon.classList.add("rotated")

    if (!openFaqItems.includes(index)) {
      openFaqItems.push(index)
    }
  })
}

function collapseAllFaq() {
  faqData.forEach((_, index) => {
    const answer = document.getElementById(`faq-answer-${index}`)
    const icon = document.getElementById(`faq-icon-${index}`)

    answer.classList.remove("active")
    icon.classList.remove("rotated")
  })
  openFaqItems = []
}

// Navigation Functions
function toggleMobileMenu() {
  const mobileNav = document.getElementById("mobileNav")
  const hamburgerBtn = document.querySelector(".mobile-menu-btn")

  mobileNav.classList.toggle("active")
  hamburgerBtn.classList.toggle("active")
}

function scrollToSection(sectionId) {
  const element = document.getElementById(sectionId)
  if (element) {
    const headerHeight = document.querySelector(".header").offsetHeight
    const elementPosition = element.offsetTop - headerHeight

    window.scrollTo({
      top: elementPosition,
      behavior: "smooth",
    })
  }

  // Close mobile menu if open
  const mobileNav = document.getElementById("mobileNav")
  const hamburgerBtn = document.querySelector(".mobile-menu-btn")
  mobileNav.classList.remove("active")
  hamburgerBtn.classList.remove("active")
}

// Scroll Spy
function initializeScrollSpy() {
  window.addEventListener("scroll", () => {
    const sections = ["home", "about", "room-types", "rooms", "facilities", "gallery", "contact"]
    const scrollPosition = window.scrollY + 100

    for (const section of sections) {
      const element = document.getElementById(section)
      if (element) {
        const offsetTop = element.offsetTop
        const offsetHeight = element.offsetHeight

        if (scrollPosition >= offsetTop && scrollPosition < offsetTop + offsetHeight) {
          updateActiveNavLink(section)
          break
        }
      }
    }
  })
}

function updateActiveNavLink(sectionId) {
  if (activeSection !== sectionId) {
    // Remove active class from all nav links
    document.querySelectorAll(".nav-link").forEach((link) => {
      link.classList.remove("active")
    })

    // Add active class to current section link
    document.querySelectorAll(`[data-section="${sectionId}"]`).forEach((link) => {
      link.classList.add("active")
    })

    activeSection = sectionId
  }
}

// Smooth Scroll for anchor links
function initializeSmoothScroll() {
  // Add smooth scrolling behavior to all internal links
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", function (e) {
      e.preventDefault()
      const target = document.querySelector(this.getAttribute("href"))
      if (target) {
        const headerHeight = document.querySelector(".header").offsetHeight
        const elementPosition = target.offsetTop - headerHeight

        window.scrollTo({
          top: elementPosition,
          behavior: "smooth",
        })
      }
    })
  })
}

// Handle window resize
window.addEventListener("resize", () => {
  // Close mobile menu on resize to desktop
  if (window.innerWidth > 768) {
    const mobileNav = document.getElementById("mobileNav")
    const hamburgerBtn = document.querySelector(".mobile-menu-btn")
    mobileNav.classList.remove("active")
    hamburgerBtn.classList.remove("active")
  }
})
