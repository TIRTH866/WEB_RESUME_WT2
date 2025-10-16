function generateResume() {
    const name = document.getElementById('fullName').value.trim();
    const email = document.getElementById('email').value.trim();
    const phone = document.getElementById('phone').value.trim();
    const location = document.getElementById('location').value.trim();
    const linkedin = document.getElementById('linkedin').value.trim();
    const summary = document.getElementById('summary').value.trim();
    const skills = document.getElementById('skills').value.trim();

    if (!name || !email) {
        alert('⚠️ Please fill in at least your Name and Email!');
        return;
    }

    let contactInfo = [];
    if (email) contactInfo.push(email);
    if (phone) contactInfo.push(phone);
    if (location) contactInfo.push(location);
    if (linkedin) contactInfo.push(linkedin);

    let html = `
        <div class="resume-header">
            <div class="resume-name">${name}</div>
            <div class="resume-contact">${contactInfo.join(' • ')}</div>
        </div>
    `;

    if (summary) {
        html += `
            <div class="resume-section">
                <div class="resume-section-title">Professional Summary</div>
                <div class="resume-item-description">${summary}</div>
            </div>
        `;
    }

    const education = [];
    for (let i = 1; i <= 2; i++) {
        const degree = document.getElementById(`edu${i}-degree`)?.value.trim();
        const school = document.getElementById(`edu${i}-school`)?.value.trim();
        const year = document.getElementById(`edu${i}-year`)?.value.trim();
        const info = document.getElementById(`edu${i}-info`)?.value.trim();
        if (degree || school) {
            education.push({ degree, school, year, info });
        }
    }

    if (education.length > 0) {
        html += '<div class="resume-section"><div class="resume-section-title">Education</div>';
        education.forEach(edu => {
            html += `
                <div class="resume-item">
                    <div class="resume-item-header">
                        <div class="resume-item-title">${edu.degree || 'Degree'}</div>
                        <div class="resume-item-date">${edu.year || ''}</div>
                    </div>
                    <div class="resume-item-subtitle">${edu.school || ''}</div>
                    ${edu.info ? `<div class="resume-item-description">${edu.info}</div>` : ''}
                </div>
            `;
        });
        html += '</div>';
    }

    const experiences = [];
    for (let i = 1; i <= 2; i++) {
        const title = document.getElementById(`exp${i}-title`)?.value.trim();
        const company = document.getElementById(`exp${i}-company`)?.value.trim();
        const duration = document.getElementById(`exp${i}-duration`)?.value.trim();
        const desc = document.getElementById(`exp${i}-desc`)?.value.trim();
        if (title || company) {
            experiences.push({ title, company, duration, desc });
        }
    }

    if (experiences.length > 0) {
        html += '<div class="resume-section"><div class="resume-section-title">Experience</div>';
        experiences.forEach(exp => {
            html += `
                <div class="resume-item">
                    <div class="resume-item-header">
                        <div class="resume-item-title">${exp.title || 'Position'}</div>
                        <div class="resume-item-date">${exp.duration || ''}</div>
                    </div>
                    <div class="resume-item-subtitle">${exp.company || ''}</div>
                    ${exp.desc ? `<div class="resume-item-description">${exp.desc}</div>` : ''}
                </div>
            `;
        });
        html += '</div>';
    }

    if (skills) {
        const skillArray = skills.split(',').map(s => s.trim()).filter(s => s);
        if (skillArray.length > 0) {
            html += '<div class="resume-section"><div class="resume-section-title">Skills</div><div class="skill-list">';
            skillArray.forEach(skill => {
                html += `<span class="skill-tag">${skill}</span>`;
            });
            html += '</div></div>';
        }
    }

    document.getElementById('resumePreview').innerHTML = html;
    alert('✅ Resume generated successfully! You can now download it as PDF.');
}

function downloadResume() {
    const preview = document.getElementById('resumePreview').innerHTML;
    if (preview.includes('empty-state')) {
        alert('⚠️ Please generate your resume first before downloading!');
        return;
    }
    window.print();
}

function clearForm() {
    if (confirm('Are you sure you want to clear all fields?')) {
        document.querySelectorAll('input, textarea').forEach(field => field.value = '');
        document.getElementById('resumePreview').innerHTML = `
            <div class="empty-state">
                <div class="empty-state-icon">📄</div>
                <p><strong>Your resume will appear here</strong></p>
                <p>Fill in your details on the left and click<br>"Generate My Resume"</p>
            </div>
        `;
        alert('✅ All fields cleared!');
    }
}
