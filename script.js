// Smooth scroll to sections
document.addEventListener('DOMContentLoaded', function() {
  // Navigation and section links
  const navButtons = document.querySelectorAll('nav button');
  const sectionMap = {
    "Home": "hero",
    "About Us": "features",
    "Contact Us": "footer"
  };

  navButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      const sectionClass = sectionMap[btn.textContent];
      if (sectionClass) {
        const target = document.querySelector('.' + sectionClass) || document.querySelector(sectionClass);
        if(target) {
          target.scrollIntoView({ behavior: "smooth" });
        }
      }
    });
  });

  // Get Started button
  const getStartedBtn = document.querySelector('.hero button');
  if(getStartedBtn) {
    getStartedBtn.addEventListener('click', function() {
      document.querySelector('.featured-trips').scrollIntoView({ behavior: "smooth" });
    });
  }

  // View Details modal for trips
  const tripButtons = document.querySelectorAll('.trip button');
  tripButtons.forEach(btn => {
    btn.addEventListener('click', function(e) {
      e.preventDefault();
      const parent = btn.closest('.trip');
      const tripTitle = parent.querySelector('h3').textContent;
      const tripDesc = parent.querySelector('p').textContent;
      showModal(tripTitle, tripDesc);
    });
  });

  // Modal mechanics
  function showModal(title, desc) {
    let modal = document.getElementById('custom-modal');
    if (!modal) {
      modal = document.createElement('div');
      modal.id = 'custom-modal';
      modal.style.position = 'fixed';
      modal.style.top = 0;
      modal.style.left = 0;
      modal.style.width = '100vw';
      modal.style.height = '100vh';
      modal.style.background = 'rgba(0,0,0,0.5)';
      modal.style.display = 'flex';
      modal.style.justifyContent = 'center';
      modal.style.alignItems = 'center';
      modal.style.zIndex = 9999;
      document.body.appendChild(modal);

      modal.innerHTML = `
        <div style="
          background: white; 
          padding: 32px 26px; 
          border-radius: 12px;
          box-shadow: 0 2px 24px rgba(74,144,226,0.16);
          min-width: 280px; 
          max-width: 90vw;
          text-align:center;
          position: relative;
        ">
          <span id="close-modal" style="position:absolute; top:10px; right:18px; font-size:1.8em; cursor:pointer; color:#4a90e2;">&times;</span>
          <h2 style="color:#4a90e2;">${title}</h2>
          <p style="margin:18px 0 8px 0; color:#555">${desc}</p>
          <button onclick="document.getElementById('custom-modal').style.display='none'" 
            style="margin-top:16px;padding:9px 22px; background:#f39c12; color:white; border:none; border-radius:8px; font-weight:600; cursor:pointer;">
            Close
          </button>
        </div>
      `;
      // Close by X
      modal.querySelector('#close-modal').onclick = function() {
        modal.style.display = 'none';
      };
      // Close when clicking outside the content
      modal.addEventListener('click', function(e) {
        if(e.target === modal) modal.style.display = 'none';
      });
    } else {
      modal.querySelector('h2').textContent = title;
      modal.querySelector('p').textContent = desc;
      modal.style.display = 'flex';
    }
  }
});
