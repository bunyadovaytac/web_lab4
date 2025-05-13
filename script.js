// Form Validation
function validateForm() {
    let isValid = true;

    // Ad yoxlaması
    const name = document.getElementById('name').value.trim();
    const nameError = document.getElementById('nameError');
    if (!name) {
        nameError.textContent = 'Name is required';
        isValid = false;
    } else if (name.length > 50) {
        nameError.textContent = 'Name must be less than 50 characters';
        isValid = false;
    } else {
        nameError.textContent = '';
    }

    // E-poçt yoxlaması
    const email = document.getElementById('email').value.trim();
    const emailError = document.getElementById('emailError');
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email) {
        emailError.textContent = 'Email is required';
        isValid = false;
    } else if (!emailRegex.test(email)) {
        emailError.textContent = 'Enter a valid email address';
        isValid = false;
    } else {
        emailError.textContent = '';
    }

    return isValid;
}

// Dinamik sahə əlavə etmə funksiyası
function addDynamicField(containerId, className, placeholder) {
    const container = document.getElementById(containerId);
    const input = document.createElement('input');
    input.type = 'text';
    input.className = className;
    input.placeholder = placeholder;
    container.appendChild(input);
}

// Dinamik sahələr üçün düymələr
document.getElementById('addEducation').addEventListener('click', () => {
    addDynamicField('educationContainer', 'education', 'Enter education details');
});

document.getElementById('addWork').addEventListener('click', () => {
    addDynamicField('workContainer', 'work', 'Enter work experience details');
});

document.getElementById('addSkill').addEventListener('click', () => {
    addDynamicField('skillsContainer', 'skill', 'Enter skill');
});

// Məlumatları saxlama
document.getElementById('saveButton').addEventListener('click', () => {
    if (validateForm()) {
        const formData = {
            name: document.getElementById('name').value.trim(),
            email: document.getElementById('email').value.trim(),
            education: [],
            work: [],
            skills: []
        };

        // Dinamik sahələri toplamaq
        document.querySelectorAll('.education').forEach(edu => {
            if (edu.value.trim()) formData.education.push(edu.value.trim());
        });
        document.querySelectorAll('.work').forEach(work => {
            if (work.value.trim()) formData.work.push(work.value.trim());
        });
        document.querySelectorAll('.skill').forEach(skill => {
            if (skill.value.trim()) formData.skills.push(skill.value.trim());
        });

        // localStorage-a saxlama
        localStorage.setItem('formData', JSON.stringify(formData));
        alert('Data saved successfully!');
    }
});

// Səhifə yüklənərkən məlumatları geri yükləmə
window.onload = function() {
    const savedData = localStorage.getItem('formData');
    if (savedData) {
        const formData = JSON.parse(savedData);

        // Əsas sahələri doldurmaq
        document.getElementById('name').value = formData.name || '';
        document.getElementById('email').value = formData.email || '';

        // Dinamik sahələri yenidən yaratmaq
        const educationContainer = document.getElementById('educationContainer');
        educationContainer.innerHTML = '';
        formData.education.forEach(edu => {
            addDynamicField('educationContainer', 'education', 'Enter education details');
            educationContainer.lastChild.value = edu;
        });
        if (!formData.education.length) {
            addDynamicField('educationContainer', 'education', 'Enter education details');
        }

        const workContainer = document.getElementById('workContainer');
        workContainer.innerHTML = '';
        formData.work.forEach(work => {
            addDynamicField('workContainer', 'work', 'Enter work experience details');
            workContainer.lastChild.value = work;
        });
        if (!formData.work.length) {
            addDynamicField('workContainer', 'work', 'Enter work experience details');
        }

        const skillsContainer = document.getElementById('skillsContainer');
        skillsContainer.innerHTML = '';
        formData.skills.forEach(skill => {
            addDynamicField('skillsContainer', 'skill', 'Enter skill');
            skillsContainer.lastChild.value = skill;
        });
        if (!formData.skills.length) {
            addDynamicField('skillsContainer', 'skill', 'Enter skill');
        }
    } else {
        // Əgər məlumat yoxdursa, boş sahələr əlavə et
        addDynamicField('educationContainer', 'education', 'Enter education details');
        addDynamicField('workContainer', 'work', 'Enter work experience details');
        addDynamicField('skillsContainer', 'skill', 'Enter skill');
    }
};
