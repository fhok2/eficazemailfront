const Teste = () => {
  return (
    <div class="relative cursor-pointer transition-all duration-200 text-lg rounded-lg tooltip-container">
  <div class="absolute top-0 left-1/2 transform -translate-x-1/2 p-2 opacity-0 pointer-events-none transition-all duration-300 rounded-lg shadow-inner tooltip">
    <div class="bg-gray-800 rounded-lg p-2 border border-gray-700 profile">
      <div class="flex gap-2 user">
        <div class="w-12 h-12 text-lg font-bold border border-orange-600 rounded-lg flex items-center justify-center bg-white text-orange-600 img">Ui</div>
        <div class="flex flex-col gap-0 text-white details">
          <div class="font-bold text-orange-600 name">User</div>
          <div class="text-gray-400 username">@username</div>
        </div>
      </div>
      <div class="text-gray-400 pt-1 about">800+ Followers</div>
    </div>
  </div>
  <div class="relative">
    <a class="text-white icon" href="#">
      <div class="relative w-14 h-14 transition-transform duration-300 transform icon-layer layer">
        <span class="absolute inset-0 border border-white rounded-lg transition-all duration-300"></span>
        <span class="absolute inset-0 border border-white rounded-lg transition-all duration-300"></span>
        <span class="absolute inset-0 border border-white rounded-lg transition-all duration-300"></span>
        <span class="absolute inset-0 border border-white rounded-lg transition-all duration-300"></span>
        <span class="absolute inset-0 border border-orange-600 rounded-lg transition-all duration-300 flex items-center justify-center instagramSVG">
          <svg fill="white" class="w-6 h-6" viewBox="0 0 448 512" xmlns="http://www.w3.org/2000/svg">
            <path d="M224.1 141c-63.6 0-114.9 51.3-114.9 114.9s51.3 114.9 114.9 114.9S339 319.5 339 255.9 287.7 141 224.1 141zm0 189.6c-41.1 0-74.7-33.5-74.7-74.7s33.5-74.7 74.7-74.7 74.7 33.5 74.7 74.7-33.6 74.7-74.7 74.7zm146.4-194.3c0 14.9-12 26.8-26.8 26.8-14.9 0-26.8-12-26.8-26.8s12-26.8 26.8-26.8 26.8 12 26.8 26.8zm76.1 27.2c-1.7-35.9-9.9-67.7-36.2-93.9-26.2-26.2-58-34.4-93.9-36.2-37-2.1-147.9-2.1-184.9 0-35.8 1.7-67.6 9.9-93.9 36.1s-34.4 58-36.2 93.9c-2.1 37-2.1 147.9 0 184.9 1.7 35.9 9.9 67.7 36.2 93.9s58 34.4 93.9 36.2c37 2.1 147.9 2.1 184.9 0 35.9-1.7 67.7-9.9 93.9-36.2 26.2-26.2 34.4-58 36.2-93.9 2.1-37 2.1-147.8 0-184.8zM398.8 388c-7.8 19.6-22.9 34.7-42.6 42.6-29.5 11.7-99.5 9-132.1 9s-102.7 2.6-132.1-9c-19.6-7.8-34.7-22.9-42.6-42.6-11.7-29.5-9-99.5-9-132.1s-2.6-102.7 9-132.1c7.8-19.6 22.9-34.7 42.6-42.6 29.5-11.7 99.5-9 132.1-9s102.7-2.6 132.1 9c19.6 7.8 34.7 22.9 42.6 42.6 11.7 29.5 9 99.5 9 132.1s2.7 102.7-9 132.1z"></path>
          </svg>
        </span>
      </div>
      <div class="absolute left-1/2 bottom-1 transform -translate-x-1/2 opacity-0 text-base font-medium transition-all duration-300 icon-text text">Instagram</div>
    </a>
  </div>
</div>

  );
}

export default Teste;