document.addEventListener('DOMContentLoaded', () => {
  // Referencias al DOM
  const themeToggleBtn = document.getElementById('themeToggleBtn');
  const themeIcon = document.getElementById('themeIcon');
  const themeText = document.getElementById('themeText');
  const copyEmailBtn = document.getElementById('copyEmailBtn');
  const printBtn = document.getElementById('printBtn');
  const toast = document.getElementById('toast');

  const emailToCopy = 'jpimientabe@gmail.com';

  // Función para mostrar notificación Toast
  let toastTimeout;
  const showToast = (message) => {
    if (!toast) return;
    toast.textContent = message;
    toast.classList.add('show');

    clearTimeout(toastTimeout);
    toastTimeout = setTimeout(() => {
      toast.classList.remove('show');
    }, 2500);
  };

  // Función para actualizar estado visual del tema
  const applyTheme = (isDark) => {
    if (isDark) {
      document.documentElement.setAttribute('data-theme', 'dark');
      themeIcon.textContent = '☀️';
      themeText.textContent = 'Modo Claro';
    } else {
      document.documentElement.removeAttribute('data-theme');
      themeIcon.textContent = '🌙';
      themeText.textContent = 'Modo Oscuro';
    }
  };

  // Recuperar preferencia de tema guardada o del sistema
  const savedTheme = localStorage.getItem('cv_theme');
  const systemPrefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
  const initialDark = savedTheme ? savedTheme === 'dark' : systemPrefersDark;
  applyTheme(initialDark);

  // Alternar tema al hacer click
  if (themeToggleBtn) {
    themeToggleBtn.addEventListener('click', () => {
      const isCurrentlyDark = document.documentElement.getAttribute('data-theme') === 'dark';
      const newTheme = !isCurrentlyDark;
      applyTheme(newTheme);
      localStorage.setItem('cv_theme', newTheme ? 'dark' : 'light');
    });
  }

  // Copiar correo al portapapeles
  if (copyEmailBtn) {
    copyEmailBtn.addEventListener('click', async () => {
      try {
        if (navigator.clipboard && navigator.clipboard.writeText) {
          await navigator.clipboard.writeText(emailToCopy);
        } else {
          // Fallback para navegadores antiguos
          const textArea = document.createElement('textarea');
          textArea.value = emailToCopy;
          textArea.style.position = 'fixed';
          textArea.style.left = '-999999px';
          document.body.appendChild(textArea);
          textArea.focus();
          textArea.select();
          document.execCommand('copy');
          document.body.removeChild(textArea);
        }
        showToast('¡Correo copiado al portapapeles!');
      } catch (err) {
        showToast('No se pudo copiar el correo.');
      }
    });
  }

  // Botón para imprimir o guardar como PDF
  if (printBtn) {
    printBtn.addEventListener('click', () => {
      window.print();
    });
  }
});
