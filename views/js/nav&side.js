// SIDEBAR DROPDOWN
const allDropdown = document.querySelectorAll('#sidebar .side-dropdown');
const sidebar = document.getElementById('sidebar');

// Function to handle dropdown click
allDropdown.forEach(item => {
  const a = item.parentElement.querySelector('a:first-child');
  a.addEventListener('click', function (e) {
    e.preventDefault();

    if (!this.classList.contains('active')) {
      allDropdown.forEach(i => {
        const aLink = i.parentElement.querySelector('a:first-child');

        aLink.classList.remove('active');
        i.classList.remove('show');
      });
    }

    this.classList.toggle('active');
    item.classList.toggle('show');
  });
});

// SIDEBAR COLLAPSE
const toggleSidebar = document.querySelector('nav .toggle-sidebar');
const allSideDivider = document.querySelectorAll('#sidebar .divider');
const mainContent = document.querySelector('main');

// Check sidebar state in localStorage on page load
const sidebarState = localStorage.getItem('sidebarState');

if (sidebarState === 'collapsed') {
  sidebar.classList.add('hide');
  adjustContentForCollapsedSidebar();
} else {
  sidebar.classList.remove('hide');
  adjustContentForExpandedSidebar();
}

// Click event to toggle sidebar and save state in localStorage
toggleSidebar.addEventListener('click', function () {
  sidebar.classList.toggle('hide');

  if (sidebar.classList.contains('hide')) {
    adjustContentForCollapsedSidebar();
    localStorage.setItem('sidebarState', 'collapsed');
  } else {
    adjustContentForExpandedSidebar();
    localStorage.setItem('sidebarState', 'expanded');
  }
});

// Adjust main content width for collapsed sidebar
function adjustContentForCollapsedSidebar() {
  allSideDivider.forEach(item => {
    item.textContent = '-';
  });
  allDropdown.forEach(item => {
    const a = item.parentElement.querySelector('a:first-child');
    a.classList.remove('active');
    item.classList.remove('show');
  });
  mainContent.style.width = "calc(100% - 60px)";
  mainContent.style.marginLeft = "60px";
}

// Adjust main content width for expanded sidebar
function adjustContentForExpandedSidebar() {
  allSideDivider.forEach(item => {
    item.textContent = item.dataset.text;
  });
  mainContent.style.width = "calc(100% - 260px)";
  mainContent.style.marginLeft = "260px";
}

// Optional: Hover behavior to temporarily show/hide sidebar
sidebar.addEventListener('mouseenter', function () {
  if (this.classList.contains('hide')) {
    allSideDivider.forEach(item => {
      item.textContent = item.dataset.text;
    });
  }
});

sidebar.addEventListener('mouseleave', function () {
  if (this.classList.contains('hide')) {
    allSideDivider.forEach(item => {
      item.textContent = '-';
    });
    allDropdown.forEach(item => {
      const a = item.parentElement.querySelector('a:first-child');
      a.classList.remove('active');
      item.classList.remove('show');
    });
  }
});

// PROFILE DROPDOWN
const profile = document.querySelector('nav .profile');
const imgProfile = profile.querySelector('img');
const dropdownProfile = profile.querySelector('.profile-link');

imgProfile.addEventListener('click', function () {
  dropdownProfile.classList.toggle('show');
});

// MENU
const allMenu = document.querySelectorAll('main .content-data .head .menu');

allMenu.forEach(item => {
  const icon = item.querySelector('.icon');
  const menuLink = item.querySelector('.menu-link');

  icon.addEventListener('click', function () {
    menuLink.classList.toggle('show');
  });
});

window.addEventListener('click', function (e) {
  if (e.target !== imgProfile) {
    if (e.target !== dropdownProfile) {
      if (dropdownProfile.classList.contains('show')) {
        dropdownProfile.classList.remove('show');
      }
    }
  }

  allMenu.forEach(item => {
    const icon = item.querySelector('.icon');
    const menuLink = item.querySelector('.menu-link');

    if (e.target !== icon) {
      if (e.target !== menuLink) {
        if (menuLink.classList.contains('show')) {
          menuLink.classList.remove('show');
        }
      }
    }
  });
});
