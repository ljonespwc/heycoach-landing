// main.js

document.addEventListener('DOMContentLoaded', function() {
  // Did You Know Tooltip
  const didYouKnowBadge = document.getElementById('didYouKnowBadge');
  const didYouKnowTooltip = document.getElementById('didYouKnowTooltip');
  const tooltipClose = document.getElementById('tooltipClose');

  if (didYouKnowBadge && didYouKnowTooltip && tooltipClose) {
    didYouKnowBadge.addEventListener('click', function() {
      didYouKnowTooltip.classList.add('active');
    });

    tooltipClose.addEventListener('click', function() {
      didYouKnowTooltip.classList.remove('active');
    });

    // Close tooltip when clicking outside
    document.addEventListener('click', function(event) {
      if (!didYouKnowTooltip.contains(event.target) && event.target !== didYouKnowBadge) {
        didYouKnowTooltip.classList.remove('active');
      }
    });
  }

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
        'images/heycoach-skydive-2.png',
        'images/heycoach-ambulance.png',
        'images/heycoach-yoga-2.png',
        'images/heycoach-dentist-2.png',
        'images/heycoach-airport-2.png',
        'images/heycoach-zombies-2.png'
    ];
    
    // Add captions for each image - Coach's Inner Thoughts
    const imageCaptions = [
        "'Funny how clients only need pep talks when I'm literally falling through the sky.'",
        "'Sure, let me just hop off this stretcher and demonstrate proper form.'",
        "'Great timing. Okay well try your best to namast-ay out of that bakery.'",
        "'The dentist is totally judging me for your text right now.'",
        "'You gotta ask about protein when I'm about to be wanded by airport security?'",
        "'Fighting for my life against the undead, but please, tell me more.'"
    ];
    
    let currentImageIndex = 0;
    const heroImage = document.getElementById('heroImage');
    const imageCaption = document.getElementById('imageCaption');
    const prevButton = document.querySelector('.slider-prev');
    const nextButton = document.querySelector('.slider-next');
    
    // Preload all images
    const preloadedImages = [];
    function preloadImages() {
        for (let i = 0; i < heroImages.length; i++) {
            const img = new Image();
            img.src = heroImages[i];
            preloadedImages.push(img);
        }
    }
    preloadImages();
    
    function updateHeroImage() {
        // Fade out image and caption
        heroImage.style.opacity = '0';
        imageCaption.style.opacity = '0';
        
        // Wait for fade out
        setTimeout(() => {
            // Update the caption text
            imageCaption.textContent = imageCaptions[currentImageIndex];
            
            // Create a new image and wait for it to load
            const newImg = new Image();
            newImg.onload = function() {
                // Once loaded, update the src and fade in
                heroImage.src = heroImages[currentImageIndex];
                heroImage.style.opacity = '1';
                imageCaption.style.opacity = '1';
            };
            newImg.src = heroImages[currentImageIndex];
            
            // Fallback in case image is already cached and onload doesn't fire
            if (newImg.complete) {
                heroImage.src = heroImages[currentImageIndex];
                heroImage.style.opacity = '1';
                imageCaption.style.opacity = '1';
            }
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
    
    // No auto-sliding - user controls the slider with navigation buttons only
    
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
      
      // Re-add animation classes with staggered delays
      chatBubbles.forEach((bubble, index) => {
        // Remove and re-add the class to restart animation
        bubble.classList.remove('chat-delay-1', 'chat-delay-2', 'chat-delay-3');
        
        // Calculate appropriate delay class based on index
        let delayClass;
        if (index < 2) delayClass = 'chat-delay-1';
        else if (index < 4) delayClass = 'chat-delay-2';
        else delayClass = 'chat-delay-3';
        
        bubble.classList.add(delayClass);
        
        // Add a small additional delay for each bubble
        setTimeout(() => {
          bubble.style.opacity = '1';
        }, 200 * index);
      });
      
      // Add click handlers to chat option buttons
      const chatOptions = demoElement.querySelectorAll('.chat-option, .number-option');
      chatOptions.forEach(option => {
        option.addEventListener('click', function() {
          // Find the parent bubble
          const parentBubble = this.closest('.chat-bubble');
          
          // Find all options in this bubble
          const allOptions = parentBubble.querySelectorAll('.chat-option, .number-option');
          
          // Highlight the clicked option
          allOptions.forEach(opt => {
            opt.style.backgroundColor = '';
            opt.style.borderColor = '';
          });
          
          this.style.backgroundColor = 'var(--brand-soft-pink)';
          this.style.borderColor = 'var(--primary)';
        });
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
            
            // Trigger confetti celebration
            triggerConfetti();
            
            // Close modal after 6 seconds (extended from 3 seconds)
            setTimeout(() => {
              modal.style.display = 'none';
              document.body.style.overflow = ''; // Re-enable scrolling
              // Hide success and show form again (for next time modal is opened)
              setTimeout(() => {
                formSuccess.style.display = 'none';
                form.style.display = 'block';
              }, 500);
            }, 6000); // Extended from 3000 to 6000 ms
          } else {
            throw new Error('Form submission failed');
          }
        } catch (error) {
          console.error('Error:', error);
          alert('Something went wrong. Please try again later.');
        }
      });
    }
    
    // Confetti celebration function
    function triggerConfetti() {
      // First burst
      confetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.6 },
        colors: ['#7b4bf1', '#F97316', '#D946EF', '#ff6d94']
      });
      
      // Second burst after a short delay
      setTimeout(() => {
        confetti({
          particleCount: 50,
          angle: 60,
          spread: 55,
          origin: { x: 0 },
          colors: ['#7b4bf1', '#F97316', '#D946EF', '#ff6d94']
        });
      }, 250);
      
      // Third burst from the right
      setTimeout(() => {
        confetti({
          particleCount: 50,
          angle: 120,
          spread: 55,
          origin: { x: 1 },
          colors: ['#7b4bf1', '#F97316', '#D946EF', '#ff6d94']
        });
      }, 400);
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