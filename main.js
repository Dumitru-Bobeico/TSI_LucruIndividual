const questions = [
    'Does your organization have a documented information security policy?',
    'Is there a designated person or team responsible for information security within your organization?',
    'Has a risk assessment been conducted to identify and evaluate security risks to your organization\'s information assets?',
    'Are there procedures in place for regularly reviewing and updating security controls based on changes in the threat landscape or business environment?',
    'Is there a process for identifying, assessing, and managing information security risks associated with third-party relationships?',
    'Are employees provided with security awareness training to educate them about information security risks and best practices?',
    'Is there a process for managing security incidents and breaches?',
    'Are there controls in place to prevent unauthorized access to information systems and data?',
    'Is there a system in place for monitoring and detecting security incidents within your organization\'s IT infrastructure?',
    'Does your organization have a process for managing access rights to information systems and data?',
    'Are there mechanisms for reporting security incidents and breaches, as well as procedures for responding to and mitigating their impact?',
    'Does your organization have a business continuity plan in place to ensure the availability of critical information and IT systems in the event of a disruption?',
    'Is there a process for regularly testing and reviewing the effectiveness of your organization\'s information security controls?',
    'Is there a process for managing and securing third-party access to your organization\'s systems?',
    'Does your organization have measures in place to protect against malware and unauthorized software installation?',
    'Are system configurations regularly reviewed and updated to address security vulnerabilities?',
    'Does your organization enforce strong password policies?',
    'Does your organization conduct background checks on employees with access to sensitive information?',
    'Are network security measures such as firewalls and intrusion detection systems implemented?',
    'Are incidents of security breaches analyzed to prevent recurrence?',
    'Whether the information is classified in terms of its value, legal requirements, sensitivity and criticality to the organization.',
    'Whether an appropriate set of procedures are defined for information labelling and handling, in accordance with the classification scheme adopted by the organization.',
    'Whether employee security roles and responsibilities, contractors and third party users were defined and documented in accordance with the organization\'s information security policy.',
    'Confirmation of claimed academic and professional qualifications and independent identity checks',
    'Users are asked to sign confidentiality or non- disclosure agreement as a part of their initial terms and conditions of the employment contract.',
    'Whether this agreement covers the information security responsibility of the organization and the employee, third party users and contractors.',
    'Whether all employees in the organization, and where relevant, contractors and third party users, receive appropriate security awareness training and regular updates in organizational policies and procedures as it pertains to their job function.',
    'Whether a physical border security facility has been implemented to protect the information processing service. Some examples of such security facilities are card control entry gates, walls, manned reception, etc.',
    'Whether entry controls are in place to allow only authorized personnel into various areas within the organization.',
    'Whether the rooms, which have the information processing service, are locked or have lockable cabinets or safes.',
    'Whether the physical protection against damage from fire, flood, earthquake, explosion, civil unrest and other forms of natural or man-made disaster should be designed and applied.',
    'Whether there is any potential threat from neighbouring premises.',
    'Where unauthorized persons may enter the premises are controlled, and information processing facilities are isolated. to avoid unauthorized access.',
    'Whether the equipment is protected from power failures and other disruptions caused by failures in supporting utilities.',
    'Whether the equipment is correctly maintained to ensure its continued availability and integrity.',
    'Whether such procedures are treated as formal documents, and therefore any changes made need management authorization.',
    'Whether duties and areas of responsibility are separated, in order to reduce opportunities for unauthorized modification or misuse of information, or services.',
    'Whether changes to provision of ser./ices, including maintaining and improving existing information security policies, procedures and controls, are managed.',
    'Whether detection, prevention and recovery controls, to protect against malicious code and appropriate user awareness procedures, were developed and implemented.'
];

var answers = Array(questions.length).fill(0);
var companyName;
var currentQuestion = 0;
var lastLeftQuestion = 0;

var wrapper = document.querySelector('.wrapper');
var customCard = document.querySelector('.custom-card');
var start = document.querySelector('#start');

const showCustomCard = () => {
    customCard.classList.remove('slide-left');
    void customCard.offsetWidth;
    customCard.classList.add('slide-left');
}

start.addEventListener('click', function (e) {
    e.preventDefault();
    showCustomCard();
    companyName = document.querySelector('#companyName').value;
    wrapper.innerHTML = `
        <div class="custom-card slide-left">
            <h2 class="text-center">${companyName} | ISO 27701 - cyber security test</h2>
            <div class="form-group mt-3" id="question">
                <p class="slide-left">Is there a designated person or team responsible for information
                    security within your organization?</p>
            </div>
            <div class="form-group answer">
                <input type="radio" class="btn-check" name="givenAnswer" value="Yes" onchange="handleAnsweringQuestion(this)" id="yesAnswer" autocomplete="off">
                <label class="btn btn-primary" for="yesAnswer">Yes</label>
                <input type="radio" class="btn-check" name="givenAnswer" id="noAnswer" value="No" onchange="handleAnsweringQuestion(this)" autocomplete="off">
                <label class="btn btn-primary" for="noAnswer" style="margin-left:calc(var(--size-bezel) * 1);">No</label>
            </div>
            <div class="footer">
                <div class="curretQ">
                    <span id="currentQuestion">1</span>
                    <span>/</span>
                    <span id="totalQuestions">30</span>
                </div>
                <div class="button-group">
                    <button type="button" class="custom-outline-btn" onclick="previousQuestion(event)">Previous</button>
                    <button type="button" class="custom-btn" onclick="nextQuestion(event)">Next</button>
                </div>
            </div>
        </div>
    `;
    document.querySelector('#totalQuestions').innerHTML = questions.length;
}, false);

const nextQuestion = (event) => {
    event.preventDefault();
    showCustomCard();
    currentQuestion++;
    if (currentQuestion < questions.length) {
        var question = document.querySelector('#question');
        var currQuestion = document.querySelector('#currentQuestion');
        currQuestion.innerHTML = currentQuestion + 1;
        question.innerHTML = `
            <p class="slide-left">${questions[currentQuestion]}</p>
        `;
        document.querySelector('#yesAnswer').checked = false;
        document.querySelector('#noAnswer').checked = false;
        if (currentQuestion < lastLeftQuestion) {
            if (answers[currentQuestion])
                document.querySelector('#yesAnswer').checked = true;
            else
                document.querySelector('#noAnswer').checked = true;
        }
        lastLeftQuestion = currentQuestion;
    }
    else {
        finishTest();
    }
}

const previousQuestion = (event) => {
    event.preventDefault();
    showCustomCard();
    if (currentQuestion == lastLeftQuestion)
        lastLeftQuestion = currentQuestion;

    if (currentQuestion > 0) {
        currentQuestion--;
        var question = document.querySelector('#question');
        var currQuestion = document.querySelector('#currentQuestion');
        currQuestion.innerHTML = currentQuestion + 1;
        question.innerHTML = `
            <p class="slide-left">${questions[currentQuestion]}</p>
        `;
        if (answers[currentQuestion])
            document.querySelector('#yesAnswer').checked = true;
        else
            document.querySelector('#noAnswer').checked = true;
    }
}

const handleAnsweringQuestion = (radioButton) => {
    if (radioButton.checked) {
        const value = radioButton.value;
        answers[currentQuestion] = value === 'Yes' ? 1 : 0;
    }
}

const finishTest = () => {
    var negativeAnswers = answers.filter(answer => answer === 0).length;
    var positiveAnswers = answers.filter(answer => answer === 1).length;
    var rate = (positiveAnswers / questions.length) * 100;
    wrapper.innerHTML = `
        <div class="custom-card slide-left">
            <h2 class="text-center">ISO 27701 - test result</h2>
            <div class="row">
            <div class="col-8">
                <div class="footer">
                    <p class="font-weight-bold">Company</p>
                    <p>${companyName}</p>
                </div>
                <hr style="border-color: rgb(37, 37, 37); margin-top: -1rem;">
                <div class="footer">
                    <p class="font-weight-bold">Total achieved</p>
                    <p>${positiveAnswers}</p>
                </div>
                <hr style="border-color: rgb(37, 37, 37); margin-top: -1rem;">
                <div class="footer">
                    <p class="font-weight-bold">Total should be implemented</p>
                    <p>${negativeAnswers}</p>
                </div>
                <hr style="border-color: rgb(37, 37, 37); margin-top: -1rem;">
                <div class="footer">
                    <p class="font-weight-bold">Total questions</p>
                    <p>${questions.length}</p>
                </div>
                <hr style="border-color: rgb(37, 37, 37); margin-top: -1rem;">
                <div class="footer">
                    <p class="font-weight-bold">ISO 27001</p>
                    <p class="text-${rate > 70 ? 'success' : 'danger'}">
                        Company ${rate > 70 ? 'passed' : 'failed'} ISO 27001 test ${rate.toFixed(2)} 
                    </p>
                </div>
                <hr style="border-color: rgb(37, 37, 37); margin-top: -1rem;">
                <div class="footer">
                    <button type="button" class="custom-btn" onclick="reattempt()">Reattempt</button>
                </div>
            </div>
            <div class="col-4">
                <canvas id="chartResult"></canvas>
            </div>
            </div>
        </div>
    `;

    const ctx = document.getElementById('chartResult');
    var data = {
        labels: ["YES", "NO"],
        datasets: [{
            data: [positiveAnswers, negativeAnswers],
            backgroundColor: [
                'green',
                'red'
            ]
        }]
    };

    var options = {
        responsive: true,
        maintainAspectRatio: false,
    };

    new Chart(ctx, {
        type: 'pie',
        data: data,
        options: options
    });
}

const reattempt = () => {
    location.reload();
}