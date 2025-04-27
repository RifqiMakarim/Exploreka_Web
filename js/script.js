$(document).ready(function () {
  $.getJSON("data/data.json")
    .done(function (data) {
      renderCards(data.destination);
    })
    .fail(function () {
      $("#wisata-list").html("<p>Gagal memuat data!</p>");
    });

  $("#mobile-menu-button").click(function () {
    $("#mobile-menu").slideToggle();
  });

  // Animasi tombol saat hover
  $('a[id^="btn-"]').hover(
    function () {
      $(this).addClass("shadow-lg");
    },
    function () {
      $(this).removeClass("shadow-lg");
    }
  );

  // Efek scroll untuk semua link
  $('a[href^="#"]').on("click", function (event) {
    event.preventDefault();
    $("html, body").animate(
      {
        scrollTop: $($(this).attr("href")).offset().top,
      },
      800
    );
  });

  // Untuk Loading State
  $(".btn-wisata").click(function (e) {
    e.preventDefault();
    $("#spinner").removeClass("hidden");
    
    setTimeout(function() {
      window.location.href = "wisata.html";
    },1500);
    
  });

  // Live Search
  $("#search-wisata").on("keyup", function () {
    const keyword = $(this).val().toLowerCase();
    $.getJSON("../data/data.json", function (data) {
      const filtered = data.destination.filter((item) =>
        item.name.toLowerCase().includes(keyword)
      );
      renderCards(filtered);
    });
  });

  // Filter Kategori
  $("#filter-category").change(function () {
    const category = $(this).val();
    $.getJSON("../data/data.json", function (data) {
      const filtered =
        category === "all"
          ? data.destination
          : data.destination.filter((item) => item.category === category);
      renderCards(filtered);
    });
  });

  // Render Card
  function renderCards(data) {
    $("#wisata-list").empty();
    data.forEach((item) => {
      $("#wisata-list").append(`
          <div class="card card bg-white rounded-xl shadow-md overflow-hidden hover:shadow-xl transition-shadow duration-300 relativ" data-id="${
            item.id
          }">
          <img src="../${item.image}"  class="w-full h-48 object-cover" alt="${
        item.name
      } ">
            <div class="p-4">
              <h3 class="text-xl font-bold mb-2" >${item.name}</h3>
              <p class="text-gray-600 line-clamp-2 mb-4">${item.description}</p>

              <div class="flex justify-between items-center">
                  <!-- Badge Kategori (Pojok Kiri Bawah) -->
                  <span class="${getBadgeColor(
                    item.category
                  )} text-white px-3 py-1 rounded-full text-xs font-bold">
                    ${item.category.toUpperCase()}
                  </span>
                
                <a 
                  href="${item.location || "#"}" 
                  target="_blank" 
                  class="inline-block bg-red-800 hover:bg-red-600 text-white px-4 py-2 rounded-lg transition-colors"
                >
                  Lihat Lokasi
                </a>
              </div>

            </div>
          </div>
        `);
    });
  }

  function getBadgeColor(category) {
    const colors = {
      alam: "bg-green-500",
      sejarah: "bg-amber-600",
      modern: "bg-blue-500",
    };
    return colors[category] || "bg-gray-500";
  }
});
