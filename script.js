const cities = [
    {
      name: "Gurugram",
      image: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
      description: "Population: 1.5M\nCost of Living: ₹50,000\nWeather: 28°C, Sunny\nTransport: Metro, Auto",
      details: { cost: 50000, breakdown: { rent: 20000, groceries: 5000, transport: 2000 }, density: 10000 },
      housing: { avgRent: "₹20,000", areas: "Sector 29, DLF Phase 3" },
      transport: { types: "Metro, Auto", commute: "30 mins to Delhi" },
      reviews: ["4/5: Job-friendly"]
    },
    {
      name: "Mumbai",
      image: "https://images.unsplash.com/photo-1566554273541-9125d31bdc7f?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
      description: "Population: 20M\nCost of Living: ₹60,000\nWeather: 30°C, Humid\nTransport: Metro, Bus",
      details: { cost: 60000, breakdown: { rent: 25000, groceries: 6000, transport: 2500 }, density: 20000 },
      housing: { avgRent: "₹25,000", areas: "Bandra, Andheri" },
      transport: { types: "Metro, Bus", commute: "45 mins to CST" },
      reviews: ["4/5: Vibrant"]
    },
    {
      name: "Dehradun",
      image: "https://images.unsplash.com/photo-1595760780346-f972eb49768f?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
      description: "Population: 0.8M\nCost of Living: ₹35,000\nWeather: 22°C, Clear\nTransport: Bus, Auto",
      details: { cost: 35000, breakdown: { rent: 15000, groceries: 4000, transport: 1500 }, density: 5000 },
      housing: { avgRent: "₹15,000", areas: "Rajpur Road, Clement Town" },
      transport: { types: "Bus, Auto", commute: "20 mins to center" },
      reviews: ["3.5/5: Peaceful"]
    },
    {
      name: "Lucknow",
      image: "https://images.unsplash.com/photo-1603162690768-3d0f7a6a9480?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
      description: "Population: 3M\nCost of Living: ₹40,000\nWeather: 25°C, Cloudy\nTransport: Bus, Auto",
      details: { cost: 40000, breakdown: { rent: 18000, groceries: 4500, transport: 1800 }, density: 8000 },
      housing: { avgRent: "₹18,000", areas: "Gomti Nagar, Hazratganj" },
      transport: { types: "Bus, Auto", commute: "25 mins to Charbagh" },
      reviews: ["4/5: Cultural"]
    },
    {
      name: "Varanasi",
      image: "https://images.unsplash.com/photo-1587668178277-295251f2e562?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
      description: "Population: 1.2M\nCost of Living: ₹38,000\nWeather: 27°C, Sunny\nTransport: Auto, Boat",
      details: { cost: 38000, breakdown: { rent: 16000, groceries: 4200, transport: 1600 }, density: 9000 },
      housing: { avgRent: "₹16,000", areas: "Assi Ghat, Dashashwamedh" },
      transport: { types: "Auto, Boat", commute: "15 mins to ghats" },
      reviews: ["4/5: Spiritual"]
    }
  ];
  
  let currentIndex = 0;
  let costChart, compareChart;
  
  // Initialize dashboard when DOM is loaded
  document.addEventListener('DOMContentLoaded', function() {
    updateDashboard();
  
    // Set up event listeners
    document.getElementById('searchInput').addEventListener('keypress', function(e) {
      if (e.key === 'Enter') searchCity();
    });
  });
  
  function updateDashboard() {
    const city = cities[currentIndex];
    
    // Update city info
    document.getElementById('cityName').textContent = city.name;
    document.getElementById('cityDescription').textContent = city.description;
    
    // Update stats
    document.getElementById('statPopulation').textContent = `Population: ${city.description.split('\n')[0].split(': ')[1]}`;
    document.getElementById('statDensity').textContent = `Density: ${city.details.density}/km²`;
    
    // Update cost chart
    if (costChart) costChart.destroy();
    const costCtx = document.getElementById('costChart').getContext('2d');
    costChart = new Chart(costCtx, {
      type: 'pie',
      data: {
        labels: ['Rent', 'Groceries', 'Transport'],
        datasets: [{
          data: [city.details.breakdown.rent, city.details.breakdown.groceries, city.details.breakdown.transport],
          backgroundColor: ['#ff6b6b', '#4ecdc4', '#45b7d1'],
          borderWidth: 1
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: { legend: { labels: { color: '#fff' } } },
        animation: { animateScale: true, animateRotate: true }
      }
    });
  
    // Update sections
    document.getElementById('housingInfo').textContent = `Avg Rent: ${city.housing.avgRent}\nPopular Areas: ${city.housing.areas}`;
    document.getElementById('transportInfo').textContent = `Types: ${city.transport.types}\nCommute: ${city.transport.commute}`;
    document.getElementById('weatherInfo').textContent = city.description.split('\n')[2].split(': ')[1];
    
    // Update reviews
    const reviewsList = document.getElementById('reviewsList');
    reviewsList.innerHTML = city.reviews.map(r => `<p class="animate-fade">${r}</p>`).join('') || 'No reviews yet.';
  }
  
  function searchCity() {
    const searchTerm = document.getElementById('searchInput').value.toLowerCase();
    if (!searchTerm) return;
    
    const foundIndex = cities.findIndex(city => city.name.toLowerCase().includes(searchTerm));
    if (foundIndex !== -1 && foundIndex !== currentIndex) {
      currentIndex = foundIndex;
      updateDashboard();
    } else if (foundIndex === -1) {
      alert('No city found.');
    }
  }
  
  function showDetails(city) {
    const modal = document.getElementById('compareModal');
    modal.style.display = 'block';
    
    const compareSelect = document.getElementById('compareSelect');
    compareSelect.innerHTML = '<option value="">Select a city to compare</option>';
    cities.forEach(c => {
      if (c.name !== city.name) {
        compareSelect.innerHTML += `<option value="${c.name}">${c.name}</option>`;
      }
    });
  
    compareSelect.onchange = () => {
      const compareCity = cities.find(c => c.name === compareSelect.value);
      if (compareCity) {
        if (compareChart) compareChart.destroy();
        const compareCtx = document.getElementById('compareChart').getContext('2d');
        compareChart = new Chart(compareCtx, {
          type: 'bar',
          data: {
            labels: ['Cost', 'Density'],
            datasets: [
              { label: city.name, data: [city.details.cost, city.details.density], backgroundColor: '#ff6b6b' },
              { label: compareCity.name, data: [compareCity.details.cost, compareCity.details.density], backgroundColor: '#4ecdc4' }
            ]
          },
          options: {
            responsive: true,
            maintainAspectRatio: false,
            scales: {
              y: { ticks: { color: '#fff' } },
              x: { ticks: { color: '#fff' } }
            },
            plugins: { legend: { labels: { color: '#fff' } } },
            animation: { duration: 1500, easing: 'easeInOutQuad' }
          }
        });
      }
    };
  }
  
  function closeModal() {
    document.getElementById('compareModal').style.display = 'none';
    if (compareChart) compareChart.destroy();
  }
  
  function addReview() {
    const review = document.getElementById('reviewInput').value.trim();
    if (!review) return;
    cities[currentIndex].reviews.push(review);
    updateDashboard();
    document.getElementById('reviewInput').value = '';
  }
  
  // Chatbot Functions
  function toggleChatbot() {
    const chatbot = document.getElementById('chatbotPopup');
    chatbot.classList.toggle('active');
    
    if (chatbot.classList.contains('active')) {
      const messages = document.getElementById('chatbotMessages');
      messages.innerHTML = `
        <p class="bot-message">Welcome to Wise Move! I can help you compare cities or get details.</p>
        <div class="chat-options">
          <div onclick="handleChatOption('compare')">🔄 Compare cities</div>
          <div onclick="handleChatOption('cost')">💰 Cost of living</div>
          <div onclick="handleChatOption('housing')">🏠 Housing info</div>
          <div onclick="handleChatOption('transport')">🚍 Transportation</div>
        </div>
      `;
    }
  }
  
  function sendMessage() {
    const input = document.getElementById('chatbotInput');
    const text = input.value.trim();
    if (text === '') return;
    
    const messages = document.getElementById('chatbotMessages');
    messages.innerHTML += `<p class="user-message">You: ${text}</p>`;
    input.value = '';
    messages.scrollTop = messages.scrollHeight;
    
    // Here you can add a simulated response or integrate a real bot
  }
  
  function handleChatOption(option) {
    const messages = document.getElementById('chatbotMessages');
    const city = cities[currentIndex];
    let response = "";
    switch(option) {
      case 'compare':
        response = `
          <p>Compare ${city.name} with:</p>
          <div class="compare-options">
            ${cities.filter(c => c.name !== city.name).map(c => `<div onclick="compareWith('${c.name}')">${c.name}</div>`).join('')}
          </div>
        `;
        break;
      case 'cost':
        response = `
          <p><strong>Cost of living in ${city.name}:</strong> ₹${city.details.cost}/month</p>
          <p><strong>Breakdown:</strong></p>
          <ul>
            <li>🏠 Rent: ₹${city.details.breakdown.rent}</li>
            <li>🛒 Groceries: ₹${city.details.breakdown.groceries}</li>
            <li>🚍 Transport: ₹${city.details.breakdown.transport}</li>
          </ul>
        `;
        break;
      case 'housing':
        response = `
          <p><strong>Housing in ${city.name}:</strong></p>
          <p>🏠 Average rent: ${city.housing.avgRent}</p>
          <p>📍 Popular areas: ${city.housing.areas}</p>
        `;
        break;
      case 'transport':
        response = `
          <p><strong>Transport in ${city.name}:</strong></p>
          <p>🚍 Options: ${city.transport.types}</p>
          <p>⏱️ Average commute: ${city.transport.commute}</p>
        `;
        break;
    }
    
    messages.innerHTML += `
      <p class="user-message">You: ${option.charAt(0).toUpperCase() + option.slice(1)}</p>
      <div class="bot-message">${response}</div>
    `;
    messages.scrollTop = messages.scrollHeight;
  }
  
  function compareWith(cityName) {
    const currentCity = cities[currentIndex];
    const compareCity = cities.find(c => c.name === cityName);
    if (!compareCity) return;
    
    const messages = document.getElementById('chatbotMessages');
    messages.innerHTML += `
      <p class="user-message">You: Compare with ${cityName}</p>
      <div class="bot-message">
        <p><strong>Comparison: ${currentCity.name} vs ${compareCity.name}</strong></p>
        <table>
          <tr>
            <th>Category</th>
            <th>${currentCity.name}</th>
            <th>${compareCity.name}</th>
          </tr>
          <tr>
            <td>💰 Cost of Living</td>
            <td>₹${currentCity.details.cost}</td>
            <td>₹${compareCity.details.cost}</td>
          </tr>
          <tr>
            <td>🏠 Avg Rent</td>
            <td>${currentCity.housing.avgRent}</td>
            <td>${compareCity.housing.avgRent}</td>
          </tr>
          <tr>
            <td>🌇 Density</td>
            <td>${currentCity.details.density}/km²</td>
            <td>${compareCity.details.density}/km²</td>
          </tr>
          <tr>
            <td>🚍 Transport</td>
            <td>${currentCity.transport.types}</td>
            <td>${compareCity.transport.types}</td>
          </tr>
          <tr>
            <td>🌦️ Weather</td>
            <td>${currentCity.description.split('\n')[2].split(': ')[1]}</td>
            <td>${compareCity.description.split('\n')[2].split(': ')[1]}</td>
          </tr>
        </table>
      </div>
    `;
    messages.scrollTop = messages.scrollHeight;
  }
  
  // Initialize the dashboard
  updateDashboard();
  