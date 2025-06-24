// 7Oak Developers - Premium Landing Page JavaScript

// Declare variables before using them
const $ = window.jQuery
const AOS = window.AOS
const bootstrap = window.bootstrap
const gtag = window.gtag

$(document).ready(() => {
  // Hide preloader
  setTimeout(() => {
    $("#preloader").fadeOut("slow")
  }, 2000)

  // Initialize AOS (Animate On Scroll)
  AOS.init({
    duration: 1000,
    easing: "ease-in-out",
    once: true,
    mirror: false,
  })

  // Navbar scroll effect
  $(window).scroll(() => {
    if ($(window).scrollTop() > 100) {
      $("#mainNavbar").addClass("scrolled")
    } else {
      $("#mainNavbar").removeClass("scrolled")
    }
  })

  // Smooth scrolling for navigation links
  $('a[href^="#"]').on("click", function (event) {
    var target = $(this.getAttribute("href"))
    if (target.length) {
      event.preventDefault()
      $("html, body")
        .stop()
        .animate(
          {
            scrollTop: target.offset().top - 80,
          },
          1000,
        )
    }
  })

  // Counter animation
  function animateCounters() {
    $(".stat-number, .trust-number").each(function () {
      var $this = $(this)
      var countTo = $this.attr("data-count")

      $({ countNum: $this.text() }).animate(
        {
          countNum: countTo,
        },
        {
          duration: 2000,
          easing: "linear",
          step: function () {
            $this.text(Math.floor(this.countNum))
          },
          complete: function () {
            if (countTo == 4.9) {
              $this.text("4.9")
            } else {
              $this.text(this.countNum + (countTo >= 100 ? "+" : ""))
            }
          },
        },
      )
    })
  }

  // Trigger counter animation when in view
  var counterAnimated = false
  $(window).scroll(() => {
    if (!counterAnimated && $(window).scrollTop() + $(window).height() > $("#home").offset().top + 200) {
      animateCounters()
      counterAnimated = true
    }
  })

  // Back to top button
  var backToTop = $("#backToTop")
  $(window).scroll(() => {
    if ($(window).scrollTop() > 300) {
      backToTop.addClass("show")
    } else {
      backToTop.removeClass("show")
    }
  })

  backToTop.on("click", (e) => {
    e.preventDefault()
    $("html, body").animate(
      {
        scrollTop: 0,
      },
      1000,
    )
  })

  // Contact form validation and submission
  $("#contactForm").on("submit", (e) => {
    e.preventDefault()

    if (validateForm()) {
      submitForm()
    }
  })

  // Real-time validation
  $(".form-control, .form-select").on("blur", function () {
    validateField($(this))
  })

  // Phone number formatting
  $("#phone").on("input", function () {
    let value = $(this).val().replace(/\D/g, "")
    if (value.length > 10) {
      value = value.substring(0, 10)
    }
    $(this).val(value)
  })

  // Auto-capitalize name field
  $("#name").on("input", function () {
    const value = $(this).val()
    $(this).val(value.replace(/\b\w/g, (l) => l.toUpperCase()))
  })

  // Form validation function
  function validateForm() {
    let isValid = true

    // Reset previous validation states
    $(".form-control, .form-select").removeClass("is-invalid")

    // Name validation
    const name = $("#name").val().trim()
    if (name.length < 2) {
      showFieldError("#name")
      isValid = false
    }

    // Email validation
    const email = $("#email").val().trim()
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(email)) {
      showFieldError("#email")
      isValid = false
    }

    // Phone validation
    const phone = $("#phone").val().replace(/\D/g, "")
    if (phone.length !== 10) {
      showFieldError("#phone")
      isValid = false
    }

    // Budget validation
    const budget = $("#budget").val()
    if (!budget) {
      showFieldError("#budget")
      isValid = false
    }

    // Message validation
    const message = $("#message").val().trim()
    if (message.length < 10) {
      showFieldError("#message")
      isValid = false
    }

    return isValid
  }

  // Individual field validation
  function validateField($field) {
    const fieldId = $field.attr("id")
    const value = $field.val().trim()

    $field.removeClass("is-invalid")

    switch (fieldId) {
      case "name":
        if (value.length < 2) {
          showFieldError($field)
          return false
        }
        break

      case "email":
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
        if (!emailRegex.test(value)) {
          showFieldError($field)
          return false
        }
        break

      case "phone":
        const phone = value.replace(/\D/g, "")
        if (phone.length !== 10) {
          showFieldError($field)
          return false
        }
        break

      case "budget":
        if (!value) {
          showFieldError($field)
          return false
        }
        break

      case "message":
        if (value.length < 10) {
          showFieldError($field)
          return false
        }
        break
    }

    return true
  }

  // Show field error
  function showFieldError(field) {
    $(field).addClass("is-invalid")
  }

  // Submit form
  function submitForm() {
    const $submitBtn = $(".btn-submit")
    const $btnText = $(".btn-text")
    const $btnLoading = $(".btn-loading")

    // Show loading state
    $submitBtn.prop("disabled", true)
    $btnText.addClass("d-none")
    $btnLoading.removeClass("d-none")

    // Collect form data
    const formData = {
      name: $("#name").val().trim(),
      email: $("#email").val().trim(),
      phone: $("#phone").val().trim(),
      budget: $("#budget").val(),
      message: $("#message").val().trim(),
      timestamp: new Date().toISOString(),
    }

    // Simulate API call
    setTimeout(() => {
      // Hide loading state
      $submitBtn.prop("disabled", false)
      $btnText.removeClass("d-none")
      $btnLoading.addClass("d-none")

      // Show success modal
      $("#successModal").modal("show")

      // Reset form
      $("#contactForm")[0].reset()

      // Log form data (replace with actual API call)
      console.log("Form submitted:", formData)

      // Track event
      trackEvent("Contact", "Form Submit", "Contact Form")
    }, 2000)
  }

  // Notification system
  function showNotification(message, type = "info") {
    const alertClass = type === "success" ? "alert-success" : type === "error" ? "alert-danger" : "alert-info"
    const iconClass =
      type === "success" ? "fa-check-circle" : type === "error" ? "fa-exclamation-triangle" : "fa-info-circle"

    const notification = $(`
            <div class="alert ${alertClass} alert-dismissible fade show" role="alert" 
                 style="position: fixed; top: 20px; right: 20px; z-index: 9999; min-width: 300px;">
                <i class="fas ${iconClass} me-2"></i>
                ${message}
                <button type="button" class="btn-close" data-bs-dismiss="alert"></button>
            </div>
        `)

    $("body").append(notification)

    // Auto remove after 5 seconds
    setTimeout(() => {
      notification.alert("close")
    }, 5000)
  }

  // Parallax effect for hero section
  $(window).scroll(() => {
    const scrolled = $(window).scrollTop()
    const parallax = $(".hero-background")
    const speed = scrolled * 0.5

    parallax.css("transform", `translateY(${speed}px)`)
  })

  // Mobile menu close on link click
  $(".navbar-nav .nav-link").on("click", () => {
    if ($(window).width() < 992) {
      $(".navbar-collapse").collapse("hide")
    }
  })

  // Initialize tooltips
  var tooltipTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="tooltip"]'))
  var tooltipList = tooltipTriggerList.map((tooltipTriggerEl) => new bootstrap.Tooltip(tooltipTriggerEl))

  // Initialize popovers
  var popoverTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="popover"]'))
  var popoverList = popoverTriggerList.map((popoverTriggerEl) => new bootstrap.Popover(popoverTriggerEl))

  // Lazy loading for images
  if ("IntersectionObserver" in window) {
    const imageObserver = new IntersectionObserver((entries, observer) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const img = entry.target
          img.src = img.dataset.src
          img.classList.remove("lazy")
          imageObserver.unobserve(img)
        }
      })
    })

    document.querySelectorAll("img[data-src]").forEach((img) => {
      imageObserver.observe(img)
    })
  }

  // Performance optimization: Debounce scroll events
  function debounce(func, wait, immediate) {
    var timeout
    return function () {
      var args = arguments
      var later = () => {
        timeout = null
        if (!immediate) func.apply(this, args)
      }
      var callNow = immediate && !timeout
      clearTimeout(timeout)
      timeout = setTimeout(later, wait)
      if (callNow) func.apply(this, args)
    }
  }

  // Apply debounce to scroll events
  $(window).scroll(
    debounce(() => {
      // Scroll-dependent functions here
    }, 10),
  )

  console.log("7Oak Developers - Landing page loaded successfully!")
})

// Utility functions
function formatCurrency(amount) {
  return "₹" + amount.toLocaleString("en-IN")
}

function validateEmail(email) {
  var re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  return re.test(email)
}

function formatPhoneNumber(phone) {
  return phone.replace(/(\d{3})(\d{3})(\d{4})/, "$1-$2-$3")
}

// Analytics tracking
function trackEvent(category, action, label) {
  if (typeof gtag !== "undefined") {
    gtag("event", action, {
      event_category: category,
      event_label: label,
    })
  }

  // Console log for debugging
  console.log(`Event Tracked: ${category} - ${action} - ${label}`)
}

// Track button clicks
$(document).on("click", ".btn-primary-custom, .btn-call, .btn-whatsapp", function () {
  var buttonText = $(this).text().trim()
  trackEvent("Button", "Click", buttonText)
})

// Export functions for external use
window.SevenOakLanding = {
  showNotification: showNotification,
  trackEvent: trackEvent,
  formatCurrency: formatCurrency,
}


  