// 1. MOCK DATABASE (Ikada manam colleges data store chestunam)
// Real world lo idi oka database nundi vastundi via API.
const collegesDatabase = [
    {
        name: "Andhra University",
        city: "visakhapatnam",
        courses: ["civil", "mech", "cse", "ece", "eee"],
        rating: 4.5,
        address: "Waltair Main Rd, Visakhapatnam"
    },
    {
        name: "Gayatri Vidya Parishad (GVP)",
        city: "visakhapatnam",
        courses: ["cse", "csm", "csd", "ece", "mech", "civil"],
        rating: 4.8,
        address: "Madhurawada, Visakhapatnam"
    },
    {
        name: "Vignan's Institute",
        city: "visakhapatnam",
        courses: ["cse", "csm", "it", "ece"],
        rating: 4.2,
        address: "Duvvada, Visakhapatnam"
    },
    {
        name: "JNTU Kakinada",
        city: "kakinada",
        courses: ["cse", "ece", "eee", "mech", "civil", "petroleum"],
        rating: 4.6,
        address: "Pithapuram Road, Kakinada"
    },
    {
        name: "Raghu Engineering College",
        city: "visakhapatnam",
        courses: ["cse", "csm", "aid", "ece"],
        rating: 4.0,
        address: "Dakamarri, Visakhapatnam"
    }
];

document.getElementById('search-button').addEventListener('click', function() {
    // Get user inputs
    const cityInput = document.getElementById('city-input').value.toLowerCase().trim();
    // Manam "User Prompt" ni "Course Name" ga consider chestunam clarity kosam
    // Leda prompt lo nundi course ni extract cheyyali (Future AI Step). 
    // Ippatiki prompt lo "csm" or "cse" ani direct ga type chestaru ani anukundam.
    const courseInput = document.getElementById('user-prompt').value.toLowerCase().trim();
    
    const resultsContainer = document.getElementById('results-container');
    const loadingSpinner = document.getElementById('loading-spinner');
    const responseArea = document.getElementById('response-area');
    const mapFrame = document.getElementById('map-iframe');

    // UI Updates
    resultsContainer.style.display = 'block';
    loadingSpinner.style.display = 'block';
    responseArea.innerHTML = ''; // Clear old results

    // Map Update logic (Same as yours)
    let locationQuery = cityInput;
    const fullQuery = `Colleges for ${courseInput} in ${locationQuery}`;
    mapFrame.src = `https://maps.google.com/maps?q=${encodeURIComponent(fullQuery)}&t=&z=13&ie=UTF8&iwloc=&output=embed`;

    // --- MAIN LOGIC: FILTERING THE DATA ---
    setTimeout(() => {
        loadingSpinner.style.display = 'none';

        // 1. Filter colleges based on City AND Course
        const filteredColleges = collegesDatabase.filter(college => {
            // Check if city matches (or if city input is empty, show all)
            const isCityMatch = cityInput === "" || college.city.includes(cityInput);
            
            // Check if the college has the course the student asked for
            // courseInput string courses array lo unda ani check chestundi
            const isCourseMatch = courseInput === "" || college.courses.some(c => c.includes(courseInput));

            return isCityMatch && isCourseMatch;
        });

        // 2. Generate HTML for the List
        if (filteredColleges.length > 0) {
            let htmlOutput = `<h3>Found ${filteredColleges.length} colleges offering "${courseInput.toUpperCase()}" in ${cityInput || 'all locations'}:</h3>`;
            htmlOutput += `<div class="college-list">`;
            
            filteredColleges.forEach(college => {
                htmlOutput += `
                    <div class="college-card" style="border:1px solid #ddd; padding:15px; margin-bottom:10px; border-radius:8px; background:#f9f9f9;">
                        <h3 style="margin:0 0 5px 0; color:#007aff;">${college.name}</h3>
                        <p style="margin:5px 0; color:#555;"><strong>Location:</strong> ${college.address}</p>
                        <p style="margin:5px 0;"><strong>Rating:</strong> ⭐ ${college.rating}</p>
                        <p style="margin:5px 0;"><strong>Courses:</strong> <span style="color:green;">${college.courses.join(', ').toUpperCase()}</span></p>
                    </div>
                `;
            });
            htmlOutput += `</div>`;
            responseArea.innerHTML = htmlOutput;
        } else {
            responseArea.innerHTML = `<p style="color:red;">Sorry, no colleges found offering <strong>${courseInput}</strong> in <strong>${cityInput}</strong>. Try searching for 'CSE' or 'Visakhapatnam'.</p>`;
        }

    }, 1000); // 1 second delay purely for "AI thinking" effect
});