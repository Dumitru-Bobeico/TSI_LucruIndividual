const questions = [
    'Does your organization have a documented information security policy?',
    'Is there a designated person or team responsible for information security within your organization?',
    'Has a risk assessment been conducted to identify and evaluate security risks to your organization\'s information assets?',
    'Are there procedures in place for regularly reviewing and updating security controls based on changes in the threat landscape or business environment?',
    'Is there a process for identifying, assessing, and managing information security risks associated with third-party relationships?',
    'Are employees provided with security awareness training to educate them about information security risks and best practices?',
    'Whether the equipment is protected from power failures and other disruptions caused by failures in supporting utilities.',
    'Whether the equipment is correctly maintained to ensure its continued availability and integrity.',
    'Whether such procedures are treated as formal documents, and therefore any changes made need management authorization.',
    'Whether duties and areas of responsibility are separated, in order to reduce opportunities for unauthorized modification or misuse of information, or services.',
    'Whether changes to provision of ser./ices, including maintaining and improving existing information security policies, procedures and controls, are managed.',
    'Whether detection, prevention and recovery controls, to protect against malicious code and appropriate user awareness procedures, were developed and implemented.',
    'Is there a process in place for securing remote access to organizational systems and data?',
    'Are software patches and updates applied in a timely manner to address known security vulnerabilities?',
    'Does your organization conduct regular security audits or assessments to identify weaknesses in the security infrastructure?',
    'Is there a procedure for encrypting sensitive data both at rest and in transit?',
    'Are there controls in place to prevent social engineering attacks, such as phishing?',
    'Does your organization have a data breach response plan?',
    'Are encryption keys managed securely to prevent unauthorized access to encrypted data?',
    'Is there a policy for secure disposal of hardware and electronic media to prevent data breaches?',
    'Are there restrictions on the use of removable media to prevent data leakage or malware infections?',
    'Does your organization have a process for monitoring and controlling employee access to sensitive information?',
    'Is multi-factor authentication implemented for accessing critical systems and data?',
    'Are security incidents and breaches documented and analyzed to identify trends and improve security measures?',
    'Is there a protocol for regularly reviewing and updating user access privileges based on changes in job roles or responsibilities?',
    'Does your organization perform background checks on third-party vendors and contractors who have access to sensitive data or systems?',
    'Are there procedures in place for securely disposing of outdated or unnecessary documentation containing sensitive information?',
    'Is there a policy for regular data backup and recovery to mitigate the impact of data loss or system failures?',
    'Are security awareness programs tailored to specific roles and responsibilities within the organization?',
    'Does your organization provide secure channels for reporting potential security vulnerabilities or incidents?',
    'Is there a process for reviewing and updating security policies and procedures in response to emerging threats or regulatory changes?',
    'Are there controls in place to prevent data exfiltration and unauthorized data transfers?',
    'Does your organization conduct regular penetration testing to assess the effectiveness of security controls?',
    'Is there a protocol for responding to and recovering from ransomware attacks or other forms of cyber extortion?',
    'Are incident response procedures tested through simulated exercises or drills?',
    'Does your organization collaborate with industry peers or security forums to share threat intelligence and best practices?',
    'Are there policies in place for secure remote work, including use of VPNs and secure Wi-Fi networks?',
    'Does your organization conduct periodic reviews of user access logs to detect unauthorized access attempts?',
    'Is there a mechanism for employees to report security concerns or incidents anonymously?',
    'Are security controls and procedures reviewed and audited by independent third parties?',
    'Does your organization have a process for evaluating and addressing security risks associated with emerging technologies, such as IoT devices or cloud services?',
    'Is there a policy for secure coding practices to minimize vulnerabilities in custom-developed software?',
    'Are there measures in place to protect against insider threats, such as employee misuse of privileges or data theft?',
    'Does your organization maintain an inventory of all assets, including hardware, software, and data?',
    'Is there a process for promptly applying security patches and updates to third-party software and dependencies?',
    'Are security incidents and breaches communicated transparently to relevant stakeholders, including customers and regulatory authorities?'
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