// main.js

document.addEventListener('DOMContentLoaded', function() {
    // ----- Navbar Scroll Effect -----
    const navbar = document.getElementById('navbar');
    
    function handleScroll() {
      if (window.scrollY > 50) {
        navbar.classList.add('scrolled');
      } else {
        navbar.classList.remove('scrolled');
      }
    }
    
    window.addEventListener('scroll', handleScroll);
    
    // Call once on load to set initial state
    handleScroll();
    
    // ----- Hero Image Slider -----
    const heroImages = [
        'images/heycoach-ambulance.png',
        'images/heycoach-dentist-2.png',
        'images/heycoach-zombies-2.png',
        'images/heycoach-baby-2.png',
        'images/heycoach-skydive-2.png',
        'images/heycoach-yoga-2.png',
        'images/heycoach-airport-2.png',
        'images/heycoach-wedding-2.png'
    ];
    
    // Add captions for each image
    const imageCaptions = [
        "When every second counts, your coach is there for the emergency cravings.",
        "No fear here! Your coach helps you get through anxiety-inducing situations.",
        "Surviving the midnight snack zombie attack with your coach's guidance.",
        "Finding balance between parenting and personal health has never been easier.",
        "Taking the leap with confidence, knowing your coach has your back.",
        "Maintaining your zen even when life gets hectic - your coach understands.",
        "Travel delays? Your coach keeps you on track, no matter the situation.",
        "Celebrating special moments while staying true to your health goals - your coach is with you!"
    ];
    
    let currentImageIndex = 0;
    const heroImage = document.getElementById('heroImage');
    const imageCaption = document.getElementById('imageCaption');
    const prevButton = document.querySelector('.slider-prev');
    const nextButton = document.querySelector('.slider-next');
    
    function updateHeroImage() {
        // Fade out image and caption
        heroImage.style.opacity = '0';
        imageCaption.style.opacity = '0';
        
        // Wait for fade out, then change image, caption and fade in
        setTimeout(() => {
        heroImage.src = heroImages[currentImageIndex];
        imageCaption.textContent = imageCaptions[currentImageIndex];
        heroImage.style.opacity = '1';
        imageCaption.style.opacity = '1';
        }, 300);
    }
    
    function nextImage() {
        currentImageIndex = (currentImageIndex + 1) % heroImages.length;
        updateHeroImage();
    }
    
    function prevImage() {
        currentImageIndex = (currentImageIndex - 1 + heroImages.length) % heroImages.length;
        updateHeroImage();
    }
    
    // Add event listeners to slider buttons
    if (prevButton && nextButton) {
        prevButton.addEventListener('click', prevImage);
        nextButton.addEventListener('click', nextImage);
    }
    
    // Set initial image and caption
    if (heroImage && imageCaption) {
        heroImage.src = heroImages[0];
        imageCaption.textContent = imageCaptions[0];
        imageCaption.style.opacity = '1';
    }
    
    // Auto slide every 8 seconds
    const slideInterval = setInterval(nextImage, 8000);
    
    // Stop auto sliding when user interacts with the slider
    const imageSlider = document.querySelector('.image-slider');
    if (imageSlider) {
        imageSlider.addEventListener('mouseenter', () => {
        clearInterval(slideInterval);
        });
    }
    
    // ----- Demo Tabs -----
    const craveDemoBtn = document.getElementById('craveDemoBtn');
    const moveDemoBtn = document.getElementById('moveDemoBtn');
    const craveDemo = document.getElementById('craveDemo');
    const moveDemo = document.getElementById('moveDemo');
    
    function showCraveDemo() {
      // Update buttons
      craveDemoBtn.className = 'tab-button active-crave';
      moveDemoBtn.className = 'tab-button inactive-move';
      
      // Show/hide demos
      craveDemo.style.display = 'block';
      moveDemo.style.display = 'none';
      
      // Reset and restart chat animations
      resetChatAnimations(craveDemo);
    }
    
    function showMoveDemo() {
      // Update buttons
      craveDemoBtn.className = 'tab-button inactive-crave';
      moveDemoBtn.className = 'tab-button active-move';
      
      // Show/hide demos
      craveDemo.style.display = 'none';
      moveDemo.style.display = 'block';
      
      // Reset and restart chat animations
      resetChatAnimations(moveDemo);
    }
    
    function resetChatAnimations(demoElement) {
      const chatBubbles = demoElement.querySelectorAll('.chat-bubble');
      
      // Reset all bubbles (hide them)
      chatBubbles.forEach(bubble => {
        bubble.style.opacity = '0';
      });
      
      // Force reflow
      void demoElement.offsetWidth;
      
      // Re-add animation classes
      chatBubbles.forEach((bubble, index) => {
        // Remove and re-add the class to restart animation
        bubble.classList.remove('chat-delay-1', 'chat-delay-2', 'chat-delay-3');
        
        // Add appropriate delay class
        if (index === 0) bubble.classList.add('chat-delay-1');
        if (index === 1) bubble.classList.add('chat-delay-2');
        if (index === 2) bubble.classList.add('chat-delay-3'); 
        if (index === 3) bubble.classList.add('chat-delay-3');
      });
    }
    
    if (craveDemoBtn && moveDemoBtn) {
      craveDemoBtn.addEventListener('click', showCraveDemo);
      moveDemoBtn.addEventListener('click', showMoveDemo);
    }
    
    // Initial animation of chat bubbles
    if (craveDemo) {
      resetChatAnimations(craveDemo);
    }
    
    // ----- FAQ Accordion -----
    const accordionItems = document.querySelectorAll('.accordion-item');
    
    accordionItems.forEach(item => {
      const trigger = item.querySelector('.accordion-trigger');
      const content = item.querySelector('.accordion-content');
      const contentInner = item.querySelector('.accordion-content-inner');
      
      trigger.addEventListener('click', () => {
        // Close all other items
        accordionItems.forEach(otherItem => {
          if (otherItem !== item && otherItem.classList.contains('active')) {
            otherItem.classList.remove('active');
            otherItem.querySelector('.accordion-content').style.maxHeight = '0';
          }
        });
        
        // Toggle current item
        const isActive = item.classList.contains('active');
        
        if (isActive) {
          item.classList.remove('active');
          content.style.maxHeight = '0';
        } else {
          item.classList.add('active');
          content.style.maxHeight = contentInner.offsetHeight + 'px';
        }
      });
    });
    
    // ----- Scroll Reveal Animation -----
    const revealElements = document.querySelectorAll('.reveal');
    
    function checkReveal() {
      const windowHeight = window.innerHeight;
      const revealPoint = 150;
      
      revealElements.forEach(element => {
        const elementTop = element.getBoundingClientRect().top;
        
        if (elementTop < windowHeight - revealPoint) {
          element.classList.add('revealed');
        }
      });
    }
    window.addEventListener('scroll', checkReveal);
    window.addEventListener('load', checkReveal);

    // ----- Update Current Year in Footer -----
    const currentYearElement = document.getElementById('current-year');
    if (currentYearElement) {
      currentYearElement.textContent = new Date().getFullYear();
    }

    // ----- Early Access Modal -----
    const modal = document.getElementById('earlyAccessModal');
    const earlyAccessButtons = document.querySelectorAll('.early-access-btn');
    const closeBtn = document.querySelector('.modal-close');
    const form = document.getElementById('earlyAccessForm');
    const formSuccess = document.getElementById('formSuccess');

    // Open modal when early access buttons are clicked
    earlyAccessButtons.forEach(button => {
      button.addEventListener('click', () => {
        modal.style.display = 'block';
        document.body.style.overflow = 'hidden'; // Prevent scrolling while modal is open
      });
    });

    // Close modal when X is clicked
    if (closeBtn) {
      closeBtn.addEventListener('click', () => {
        modal.style.display = 'none';
        document.body.style.overflow = ''; // Re-enable scrolling
      });
    }

    // Close modal when clicking outside the modal content
    window.addEventListener('click', (event) => {
      if (event.target === modal) {
        modal.style.display = 'none';
        document.body.style.overflow = ''; // Re-enable scrolling
      }
    });

    // Handle form submission
    if (form) {
      form.addEventListener('submit', async (e) => {
        e.preventDefault();

        try {
          const response = await fetch(form.action, {
            method: 'POST',
            body: new FormData(form),
            headers: {
              'Accept': 'application/json'
            }
          });

          if (response.ok) {
            // Show success message
            form.style.display = 'none';
            formSuccess.style.display = 'block';

            // Reset form for future use
            form.reset();

            // Close modal after 3 seconds
            setTimeout(() => {
              modal.style.display = 'none';
              document.body.style.overflow = ''; // Re-enable scrolling
              // Hide success and show form again (for next time modal is opened)
              setTimeout(() => {
                formSuccess.style.display = 'none';
                form.style.display = 'block';
              }, 500);
            }, 3000);
          } else {
            throw new Error('Form submission failed');
          }
        } catch (error) {
          console.error('Error:', error);
          alert('Something went wrong. Please try again later.');
        }
      });
    }

    // FIXED: Mobile Menu Toggle - removed the nested DOMContentLoaded
    const mobileMenuToggle = document.getElementById('mobileMenuToggle');
    const mainNav = document.getElementById('mainNav');

    if (mobileMenuToggle && mainNav) {
      mobileMenuToggle.addEventListener('click', function() {
        this.classList.toggle('active');
        mainNav.classList.toggle('mobile-open');
        console.log('Mobile menu toggled'); // Add this for debugging
      });
    }

    // Close mobile menu when clicking a nav item
    const navLinks = document.querySelectorAll('#mainNav a');
    navLinks.forEach(link => {
      link.addEventListener('click', () => {
        if (mobileMenuToggle) { // Add this check
          mobileMenuToggle.classList.remove('active');
          mainNav.classList.remove('mobile-open');
        }
      });
    });
});