// 页面加载完成后执行
document.addEventListener('DOMContentLoaded', function() {
    // 移除加载动画，改为较短的延时并添加错误处理
    setTimeout(function() {
        try {
            const loader = document.getElementById('loader');
            const content = document.getElementById('content');
            
            if (loader) loader.classList.add('hidden');
            if (content) content.classList.remove('hidden');
            
            // 初始化技能条动画
            initSkillBars();
        } catch (error) {
            console.error('初始化页面时出错:', error);
            // 确保页面内容显示，即使发生错误
            const loader = document.getElementById('loader');
            const content = document.getElementById('content');
            
            if (loader) loader.classList.add('hidden');
            if (content) content.classList.remove('hidden');
        }
    }, 500); // 将等待时间从1000ms减少到500ms
    
    // 其余初始化代码...
    try {
        // 初始化导航栏
        initNavigation();
        
        // 初始化作品集过滤器
        initPortfolioFilter();
        
        // 初始化作品集模态框
        initPortfolioModal();
        
        // 替换为项目轮播初始化
        initProjectsCarousel();
        
        // 初始化主题切换
        initThemeSwitch();
        
        // 初始化表单提交
        initContactForm();
    } catch (error) {
        console.error('初始化功能时出错:', error);
    }
});

// 监听滚动事件
window.addEventListener('scroll', function() {
    // 导航栏滚动效果
    const navbar = document.getElementById('navbar');
    if (window.scrollY > 50) {
        navbar.style.boxShadow = '0 5px 15px rgba(0, 0, 0, 0.1)';
        navbar.style.height = '60px';
    } else {
        navbar.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.1)';
        navbar.style.height = 'var(--header-height)';
    }
    
    // 更新活动导航项
    updateActiveNavItem();
});

// 初始化技能条动画
function initSkillBars() {
    const skillLevels = document.querySelectorAll('.skill-level');
    skillLevels.forEach(level => {
        const width = level.style.width;
        level.style.width = '0';
        setTimeout(() => {
            level.style.width = width;
        }, 300);
    });
}

// 初始化导航栏
function initNavigation() {
    // 移动端菜单切换
    const navToggle = document.getElementById('navToggle');
    const navLinks = document.querySelector('.nav-links');
    
    navToggle.addEventListener('click', function() {
        navLinks.classList.toggle('active');
    });
    
    // 导航链接点击事件
    const navItems = document.querySelectorAll('.nav-links a');
    navItems.forEach(item => {
        item.addEventListener('click', function() {
            navLinks.classList.remove('active');
            
            // 更新活动状态
            navItems.forEach(link => link.classList.remove('active'));
            this.classList.add('active');
        });
    });
    
    // 初始化活动导航项
    updateActiveNavItem();
}

// 更新活动导航项
function updateActiveNavItem() {
    const sections = document.querySelectorAll('.section');
    const navItems = document.querySelectorAll('.nav-links a');
    
    let currentSection = '';
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop - 100;
        const sectionHeight = section.offsetHeight;
        const sectionId = section.getAttribute('id');
        
        if (window.scrollY >= sectionTop && window.scrollY < sectionTop + sectionHeight) {
            currentSection = sectionId;
        }
    });
    
    navItems.forEach(item => {
        item.classList.remove('active');
        if (item.getAttribute('href') === `#${currentSection}`) {
            item.classList.add('active');
        }
    });
}

// 初始化作品集过滤器
function initPortfolioFilter() {
    const filterBtns = document.querySelectorAll('.filter-btn');
    const portfolioItems = document.querySelectorAll('.portfolio-item');
    
    filterBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            // 更新活动按钮
            filterBtns.forEach(btn => btn.classList.remove('active'));
            this.classList.add('active');
            
            // 过滤项目
            const filter = this.getAttribute('data-filter');
            
            portfolioItems.forEach(item => {
                if (filter === 'all' || item.getAttribute('data-category') === filter) {
                    item.style.display = 'block';
                } else {
                    item.style.display = 'none';
                }
            });
        });
    });
}

// 初始化作品集模态框
function initPortfolioModal() {
    const portfolioLinks = document.querySelectorAll('.portfolio-link, .project-link');
    const modal = document.getElementById('portfolioModal');
    const modalContent = document.getElementById('modalContent');
    const closeModal = document.querySelector('.close-modal');
    
    // 项目详情数据
    const projectData = {
        'project1': {
            title: '多模态医疗诊断系统',
            category: 'AI研究',
            client: '微软亚洲研究院',
            date: '2022年',
            description: '这是一个结合图像识别和自然语言处理的医疗诊断辅助系统，能够同时分析医学影像和病历文本数据，为医生提供诊断建议。该项目获得2022年《麻省理工科技评论》全球十大突破技术提名。',
            technologies: ['深度学习', '计算机视觉', 'NLP', 'Python', 'TensorFlow'],
            image: 'https://picsum.photos/800/400?random=7',
            pdfUrl: 'assets/docs/project1.pdf',
            pdfTitle: '医疗诊断系统技术白皮书'
        },
        'project2': {
            title: 'NLP-Toolkit开源项目',
            category: '开发项目',
            client: '开源社区',
            date: '2020-至今',
            description: '这是一个用于自然语言处理的开源工具包，提供了从文本预处理到高级模型训练的全套解决方案。目前在GitHub上已累计12k+Star，被TensorFlow官方推荐集成。',
            technologies: ['Python', 'NLP', 'BERT', 'GPU加速', '分布式计算'],
            image: 'https://picsum.photos/800/400?random=8',
            pdfUrl: 'assets/docs/project2.pdf',
            pdfTitle: 'NLP-Toolkit使用文档'
        },
        'project3': {
            title: '可解释AI临床决策支持',
            category: '学术论文',
            client: 'NeurIPS 2023',
            date: '2023年',
            description: '这篇论文探讨了如何使AI模型在医疗决策支持中更加透明和可解释，提出了一种新的可视化技术，使医生能够理解AI推荐背后的原因。该论文发表于NeurIPS 2023，目前引用量已破千。',
            technologies: ['可解释AI', '医疗信息学', '深度学习', '决策支持系统'],
            image: 'https://picsum.photos/800/400?random=9',
            pdfUrl: 'assets/docs/project3.pdf',
            pdfTitle: '可解释AI学术论文'
        }
    };
    
    // 打开模态框
    portfolioLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            const projectId = this.getAttribute('data-id');
            const project = projectData[projectId];
            
            if (project) {
                // 构建模态框内容
                let techHtml = '';
                project.technologies.forEach(tech => {
                    techHtml += `<span class="tech-tag">${tech}</span>`;
                });
                
                const html = `
                    <div class="project-detail">
                        <div class="project-image">
                            <img src="${project.image}" alt="${project.title}">
                        </div>
                        <div class="project-info">
                            <h2>${project.title}</h2>
                            <p class="project-category">${project.category}</p>
                            
                            <div class="project-meta">
                                <div class="meta-item">
                                    <h4>客户</h4>
                                    <p>${project.client}</p>
                                </div>
                                <div class="meta-item">
                                    <h4>日期</h4>
                                    <p>${project.date}</p>
                                </div>
                            </div>
                            
                            <div class="project-desc">
                                <h4>项目描述</h4>
                                <p>${project.description}</p>
                            </div>
                            
                            <div class="project-tech">
                                <h4>技术 & 工具</h4>
                                <div class="tech-tags">
                                    ${techHtml}
                                </div>
                            </div>
                            
                            <div class="project-document">
                                <h4>项目文档</h4>
                                <a href="${project.pdfUrl}" class="document-download" target="_blank">
                                    <i class="fas fa-file-pdf"></i> 下载 ${project.pdfTitle}
                                </a>
                            </div>
                        </div>
                    </div>
                `;
                
                modalContent.innerHTML = html;
                modal.style.display = 'block';
                document.body.style.overflow = 'hidden';
            }
        });
    });
    
    // 关闭模态框
    closeModal.addEventListener('click', function() {
        modal.style.display = 'none';
        document.body.style.overflow = 'auto';
    });
    
    // 点击模态框外部关闭
    window.addEventListener('click', function(e) {
        if (e.target === modal) {
            modal.style.display = 'none';
            document.body.style.overflow = 'auto';
        }
    });
}

// 项目轮播初始化函数
function initProjectsCarousel() {
    const carousel = document.querySelector('.projects-carousel');
    if (!carousel) return; // 如果轮播不存在则退出
    
    const carouselInner = document.querySelector('.projects-carousel .carousel-inner');
    const prevBtn = document.querySelector('.projects-carousel .carousel-control.prev');
    const nextBtn = document.querySelector('.projects-carousel .carousel-control.next');
    const indicators = document.querySelectorAll('.projects-carousel .indicator');
    const items = document.querySelectorAll('.project-carousel-item');
    const filterBtns = document.querySelectorAll('.filter-btn');
    
    let currentIndex = 0;
    let interval;
    let filteredItems = [...items]; // 默认显示所有项目
    
    // 更新轮播显示
    function updateCarousel() {
        items.forEach((item, index) => {
            item.classList.remove('active');
        });
        
        if (filteredItems.length > 0) {
            filteredItems[currentIndex].classList.add('active');
            
            // 更新指示器
            indicators.forEach((indicator, index) => {
                indicator.style.display = index < filteredItems.length ? 'block' : 'none';
                indicator.classList.toggle('active', index === currentIndex);
            });
        }
    }
    
    // 自动播放
    function startAutoPlay() {
        clearInterval(interval); // 清除之前的定时器
        if (filteredItems.length <= 1) return; // 如果只有一个项目则不自动播放
        
        interval = setInterval(() => {
            currentIndex = (currentIndex + 1) % filteredItems.length;
            updateCarousel();
        }, 5000);
    }
    
    // 停止自动播放
    function stopAutoPlay() {
        clearInterval(interval);
    }
    
    // 过滤项目
    filterBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            // 更新活动按钮
            filterBtns.forEach(btn => btn.classList.remove('active'));
            this.classList.add('active');
            
            // 过滤项目
            const filter = this.getAttribute('data-filter');
            
            if (filter === 'all') {
                filteredItems = [...items];
            } else {
                filteredItems = [...items].filter(item => 
                    item.getAttribute('data-category') === filter
                );
            }
            
            // 重置当前索引并更新轮播
            currentIndex = 0;
            updateCarousel();
            stopAutoPlay();
            startAutoPlay();
        });
    });
    
    // 上一张
    prevBtn.addEventListener('click', () => {
        if (filteredItems.length <= 1) return;
        currentIndex = (currentIndex - 1 + filteredItems.length) % filteredItems.length;
        updateCarousel();
        stopAutoPlay();
        startAutoPlay();
    });
    
    // 下一张
    nextBtn.addEventListener('click', () => {
        if (filteredItems.length <= 1) return;
        currentIndex = (currentIndex + 1) % filteredItems.length;
        updateCarousel();
        stopAutoPlay();
        startAutoPlay();
    });
    
    // 指示器点击
    indicators.forEach((indicator, index) => {
        indicator.addEventListener('click', () => {
            if (index >= filteredItems.length) return;
            currentIndex = index;
            updateCarousel();
            stopAutoPlay();
            startAutoPlay();
        });
    });
    
    // 鼠标悬停暂停自动播放
    carousel.addEventListener('mouseenter', stopAutoPlay);
    carousel.addEventListener('mouseleave', startAutoPlay);
    
    // 初始化
    updateCarousel();
    startAutoPlay();
}

// 初始化主题切换
function initThemeSwitch() {
    const themeSwitch = document.querySelector('.theme-switch');
    const icon = themeSwitch.querySelector('i');
    
    // 检查本地存储中的主题
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'dark') {
        document.documentElement.setAttribute('data-theme', 'dark');
        icon.classList.remove('fa-moon');
        icon.classList.add('fa-sun');
    }
    
    // 切换主题
    themeSwitch.addEventListener('click', function() {
        if (document.documentElement.getAttribute('data-theme') === 'dark') {
            // 切换到亮色主题
            document.documentElement.removeAttribute('data-theme');
            localStorage.setItem('theme', 'light');
            icon.classList.remove('fa-sun');
            icon.classList.add('fa-moon');
        } else {
            // 切换到暗色主题
            document.documentElement.setAttribute('data-theme', 'dark');
            localStorage.setItem('theme', 'dark');
            icon.classList.remove('fa-moon');
            icon.classList.add('fa-sun');
        }
    });
}

// 初始化联系表单
function initContactForm() {
    const contactForm = document.getElementById('contactForm');
    
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // 获取表单数据
        const name = document.getElementById('name').value;
        const email = document.getElementById('email').value;
        const subject = document.getElementById('subject').value;
        const message = document.getElementById('message').value;
        
        // 这里通常会发送AJAX请求到服务器
        // 但是在这个demo中，我们只模拟成功响应
        
        // 移除之前的消息
        const oldMessage = contactForm.querySelector('.form-message');
        if (oldMessage) {
            oldMessage.remove();
        }
        
        // 创建成功消息
        const successMessage = document.createElement('div');
        successMessage.className = 'form-message success';
        successMessage.textContent = '消息已发送！我们会尽快回复您。';
        
        // 添加消息到表单
        contactForm.appendChild(successMessage);
        
        // 重置表单
        contactForm.reset();
        
        // 5秒后移除消息
        setTimeout(() => {
            successMessage.remove();
        }, 5000);
    });
}

// 添加自定义鼠标指针效果
document.body.classList.add('custom-cursor'); 