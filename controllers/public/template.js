// Constantes para establecer la etiqueta del cuerpo la página web.
const BODY = document.querySelector('body');
// Constantes para establecer la etiqueta del cuadro principal la página web.
const MAIN = document.querySelector('main');
// Constantes para establecer las etiquetas de encabezado y pie de la página web.
const HEADER = document.querySelector('header');
const FOOTER = document.querySelector('footer');

document.addEventListener('DOMContentLoaded', async () => {
    BODY.classList.add('bg-[#1E1E1E]');
    MAIN.classList.add('py-4', 'container');
    HEADER.innerHTML = `
        <nav class="border-b border-[#EDEDED]">
            <div class="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
                <a href="../../../views/public/public/easter-egg.html" class="flex items-center">
                    <img src="https://img.icons8.com/ios-filled/50/EDEDED/pet-commands-train.png" class="h-8 mr-3" alt="Logo">
                    <span class="self-center text-[#EDEDED] text-2xl font-semibold whitespace-nowrap">Los gaticos</span>
                </a>
                <!-- <div class="flex md:order-2">
                    <a href="https://github.com/ryukomvp" class="bg-[#753188] text-[#EDEDED] border border-[#EDEDED] font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-3 md:mr-0 inline-flex items-center" target="_blank">  <svg class="w-4 h-4 mr-2" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
                        <path fill-rule="evenodd" d="M10 .333A9.911 9.911 0 0 0 6.866 19.65c.5.092.678-.215.678-.477 0-.237-.01-1.017-.014-1.845-2.757.6-3.338-1.169-3.338-1.169a2.627 2.627 0 0 0-1.1-1.451c-.9-.615.07-.6.07-.6a2.084 2.084 0 0 1 1.518 1.021 2.11 2.11 0 0 0 2.884.823c.044-.503.268-.973.63-1.325-2.2-.25-4.516-1.1-4.516-4.9A3.832 3.832 0 0 1 4.7 7.068a3.56 3.56 0 0 1 .095-2.623s.832-.266 2.726 1.016a9.409 9.409 0 0 1 4.962 0c1.89-1.282 2.717-1.016 2.717-1.016.366.83.402 1.768.1 2.623a3.827 3.827 0 0 1 1.02 2.659c0 3.807-2.319 4.644-4.525 4.889a2.366 2.366 0 0 1 .673 1.834c0 1.326-.012 2.394-.012 2.72 0 .263.18.572.681.475A9.911 9.911 0 0 0 10 .333Z" clip-rule="evenodd"/>
                    </svg>Github</a>
                </div> -->
                <button data-collapse-toggle="navbar-sticky" type="button" class="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-[#EDEDED] rounded-lg md:hidden aria-controls="navbar-sticky" aria-expanded="false">
                    <span class="sr-only">Open main menu</span>
                    <svg class="w-5 h-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 17 14">
                        <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M1 1h15M1 7h15M1 13h15"/>
                    </svg>
                </button>
                <div class="items-center justify-between hidden w-full md:flex md:w-auto md:order-1" id="navbar-sticky">
                    <ul class="flex flex-col p-4 md:p-0 mt-4 font-medium md:flex-row md:space-x-8 md:mt-0 md:border-0">
                        <li>
                        <a href="../../views/public/index.html" class="block py-2 pl-3 pr-4 text-[#EDEDED] hover:text-[#333399] hover:underline decoration-[#333399]" aria-current="page">Inicio</a>
                        </li>
                        <li>
                        <a href="../../views/public/about-me.html" class="block py-2 pl-3 pr-4 text-[#EDEDED] hover:text-[#333399] hover:underline decoration-[#333399]">Sobre mi</a>
                        </li>
                        <li>
                        <a href="../../views/public/directory.html" class="block py-2 pl-3 pr-4 text-[#EDEDED] hover:text-[#333399] hover:underline decoration-[#333399]">Directorio</a>
                        </li>
                    </ul>
                </div>
            </div>
        </nav>
    `;
    FOOTER.innerHTML = `
        <div class="2xl:sticky bottom-0 left-0 right-0 p-4 border-t border-[#EDEDED] shadow md:flex md:items-center md:justify-between md:p-6">
            <span class="text-sm text-[#444444] sm:text-center">© 2023. Developed by Daniel Hernandez.
            </span>
            <ul class="flex flex-wrap items-center mt-3 text-sm font-medium text-[#444444] sm:mt-0">
                <li>
                    <a href="https://www.instagram.com/dnlhernandez_/" class="mr-4 hover:underline md:mr-6 text-center inline-flex items-center"  target="_blank"><img src="https://img.icons8.com/ios/25/444444/instagram-new--v1.png" alt="ig"/></a>
                </li>
                <li>
                    <a href="https://twitter.com/dnlhernandez_" class="mr-4 hover:underline md:mr-6 text-center inline-flex items-center" target="_blank"><img src="https://img.icons8.com/ios/25/444444/twitterx--v1.png" alt="x"/></a>
                </li>
                <li>
                <a href="https://github.com/ryukomvp" class="mr-4 hover:underline md:mr-6 text-center inline-flex items-center" target="_blank"><img src="https://img.icons8.com/ios/25/444444/github--v1.png" alt="github"/></a>
            </li>
            </ul>
        </div>
    `;
});