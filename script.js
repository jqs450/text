// script.js
const questions = [
    {
        type: 'multiple-choice',
        question: '硫酸铜溶液的颜色是：',
        options: ['A. 红色', 'B. 蓝色', 'C. 黄色'],
        answer: 'B. 蓝色',
        explanation: '硫酸铜(CuSO4)在水中溶解后形成的水合物CuSO4·5H2O通常呈现蓝色，这是因为铜离子[Cu(H2O)6]2+吸收了可见光谱中的红色部分而反射或透射蓝色。'
    },
    {
        type: 'multiple-choice',
        question: '下列哪一项不是影响硫酸铜结晶过程的因素？',
        options: ['A. 温度', 'B. 溶液浓度', 'C. 容器材质', 'D. 搅拌速度'],
        answer: 'C. 容器材质',
        explanation: '温度、溶液浓度和搅拌速度都会直接影响晶体的形成与大小。容器材质虽然可能对实验有一定影响（比如透明度便于观察），但它并不是直接决定结晶过程的关键因素。'
    },
    {
        type: 'multiple-choice',
        question: '当硫酸铜溶液达到饱和状态时，若再加入少量硫酸铜固体，则会出现什么情况？',
        options: ['A. 固体全部溶解', 'B. 部分固体溶解', 'C. 不再有更多固体溶解'],
        answer: 'C. 不再有更多固体溶解',
        explanation: '当溶液已经饱和，即达到了其在特定温度下所能容纳的最大溶质量时，额外添加的固体将不会继续溶解，而是会以未溶解的形式存在于溶液中。'
    },
    {
        type: 'fill-in-the-blank',
        question: '在进行硫酸铜结晶实验前，需要先准备好<span style="color: red;">______</span>溶液。',
        answer: '饱和',
        explanation: '为了确保能够得到晶体，必须从饱和溶液开始，因为只有这样才有可能通过冷却或其他方式促使过量的溶质沉淀出来形成晶体。'
    },
    {
        type: 'fill-in-the-blank',
        question: '若想获得纯净的硫酸铜晶体，应该从<span style="color: red;">______</span>（填“饱和”或“不饱和”）溶液开始结晶。',
        answer: '饱和',
        explanation: '同上，饱和溶液才能保证有足够的溶质可以析出成晶体。'
    },
    {
        type: 'fill-in-the-blank',
        question: '通过加热使硫酸铜溶解于水中后，通常采用<span style="color: red;">______</span>的方式让溶液慢慢冷却以形成晶体。',
        answer: '缓慢冷却',
        explanation: '缓慢冷却有助于控制晶体的成长速率，从而有利于形成较大且结构完整的晶体。'
    },
    {
        type: 'fill-in-the-blank',
        question: '在实验室条件下，观察到硫酸铜晶体呈现<span style="color: red;">______</span>形状。',
        answer: '菱形十二面体',
        explanation: '硫酸铜晶体自然状态下倾向于形成具有特定几何形态的晶体结构，常见的就是这种多面体形状。'
    }
];

let currentQuestionIndex = 0;

function showQuestion(index) {
    const question = questions[index];
    let content = `<p>${question.question}</p>`;
    
    if (question.type === 'multiple-choice') {
        content += question.options.map(option => `<label><input type="radio" name="answer" value="${option}">${option}</label><br>`).join('');
    } else if (question.type === 'fill-in-the-blank') {
        content += `<input type="text" id="answer-text"><br>`;
    }

    document.getElementById('question').innerHTML = content;
    document.getElementById('feedback').textContent = '';
    document.getElementById('submitAnswer').style.display = 'inline-block';
    document.getElementById('nextQuestion').style.display = 'none';
}

function checkAnswer() {
    const question = questions[currentQuestionIndex];
    let userAnswer = '';

    if (question.type === 'multiple-choice') {
        const radios = document.getElementsByName('answer');
        for (let i = 0; i < radios.length; i++) {
            if (radios[i].checked) {
                userAnswer = radios[i].value;
                break;
            }
        }
    } else if (question.type === 'fill-in-the-blank') {
        userAnswer = document.getElementById('answer-text').value;
    }

    const feedbackElement = document.getElementById('feedback');
    if (userAnswer.toLowerCase().trim() === question.answer.toLowerCase()) {
        feedbackElement.textContent = `正确！${question.explanation}`;
        document.getElementById('submitAnswer').style.display = 'none';
        document.getElementById('nextQuestion').style.display = 'inline-block';
    } else {
        feedbackElement.textContent = '错误，请再试一次。';
    }

    if (currentQuestionIndex === questions.length - 1) {
        document.getElementById('nextQuestion').textContent = '完成测验';
    }
}

function nextQuestion() {
    if (currentQuestionIndex < questions.length - 1) {
        currentQuestionIndex++;
        showQuestion(currentQuestionIndex);
    } else {
        document.getElementById('question').innerHTML = '';
        document.getElementById('feedback').textContent = '恭喜你完成所有题目！';
        document.getElementById('feedback').classList.add('completed'); // 添加 completed 类
        document.getElementById('nextQuestion').style.display = 'none';
    }
}

document.getElementById('submitAnswer').addEventListener('click', checkAnswer);
document.getElementById('nextQuestion').addEventListener('click', nextQuestion);
showQuestion(0);