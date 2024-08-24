import { useState, useEffect } from 'react';

function LightDarkSystem() {

    const [theme, setTheme] = useState(
        localStorage.getItem('theme') ? localStorage.getItem('theme') : 'system'  // default to system
      );
      const element = document.documentElement; // html element
      const darkQuery = window.matchMedia('(prefers-color-scheme: dark)'); // dark mode query
    
      // theme options
      const options = [
        {
          icon: 'sunny',
          text: 'light',
        },
        {
          icon: 'moon',
          text: 'dark',
        },
        {
          icon: 'desktop-outline',
          text: 'system',
        },
      ];
    
      // check if system theme is dark
      function onWindowMatch(){
        if( localStorage.theme === "dark" || (!("theme" in localStorage) && darkQuery.matches)){
          element.classList.add('dark'); 
        }else{
          element.classList.remove('dark');
        }
      };
    
      onWindowMatch();
    
      // set theme
      useEffect(() => {
        switch (theme) {
          case 'dark':
            element.classList.add('dark');
            localStorage.setItem('theme', 'dark');
            break;
          case 'light':
            element.classList.remove('dark');
            localStorage.setItem('theme', 'light');
            break;
          default:
            localStorage.removeItem('theme');
            onWindowMatch();
            break;
        }
      }, [theme]);
    
      // automatically change theme when system theme changes
      darkQuery.addEventListener('change', (e) => {
        if (!("theme" in localStorage)) {
          if (e.matches) {
            element.classList.add('dark');
          } else {
            element.classList.remove('dark');
          }
        }
      });
      
  return (
      <div className="fixed right-2 top-4 duration-100 rounded-lg mr-5">
        {/* Themes Button */}
        {options?.map(opt=>(
          <button 
            key={opt.text}
            onClick={() => setTheme(opt.text)}
            className={`w-8 h-8 leading-9 text-2xl rounded-full m-1 ${
                theme === opt.text && "text-sky-600"
              }`}
            >
            <ion-icon name={opt.icon}></ion-icon>
          </button>
          ))
        }
      </div>
  )
}

export default LightDarkSystem
