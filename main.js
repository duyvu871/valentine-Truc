let starRating = 1;
[...document.querySelectorAll('label[for^="rating"]')].map((star, i) => {
    star.addEventListener('click', () => {
        const starIndex = star.getAttribute("for").split('rating-')[1];
        starRating = Number(starIndex);
        // console.log(starRating);
    });
});
let feedback = '';
document.querySelector('#feedback').addEventListener('input', (e) => {
    feedback = e.target.value;
    // console.log(feedback);
});

const createVisualElement = domString => new DOMParser().parseFromString(domString, 'text/html').body.firstChild;


//@component
const Component = {
    arrowLeft: createVisualElement('<i class="fas fa-arrow-left"></i>'),
    arrowRight: createVisualElement('<i class="fas fa-arrow-right"></i>'),
}

const slideArea = document.querySelector('.slide-area');
const ModalElement = document.querySelector('.image-modal');
const Slide = {
    currentIndex: 0,
    slideArea: slideArea,
    slideItemImage: new Array(5).fill('').map((_, index) => `./assets/anh-${index + 1}.jpg`),
    content: new Array(5).fill(''),
    currentDetailImage: '',
    slideTransform: (index = 0) => {
        Slide.slideArea.children[Slide.currentIndex].classList.remove('active');
        if (index < 0 || index > Slide.slideArea.children.length - 1) return;
        Slide.currentIndex = index < 0 ? 0 : index > Slide.slideArea.children.length - 1 ? Slide.slideArea.children.length - 1 : index;
        Slide.slideArea.style.transform = `translateX(-${index * 100}%)`;
        Slide.slideArea.children[Slide.currentIndex].classList.add('active');
        // console.log("slide index: ", Slide.currentIndex);
    },
    slideItemContent: (image_urls = [''], content = ['']) => {
        return createVisualElement(`
            <div class="slide-item flex flex-col justify-center item-center gap-2 max-w-[500px] p-4 m-4 bg-white rounded-lg">
                <div class="slide-item_image-group flex flex-col justify-center align-center">
                    ${image_urls.map((url, index) => {
            return (`
                            <div class="flex justify-center items-center">
                                <div class="flex justify-center items-center w-fit">
                                    <img 
                                        src="${url}" 
                                        class="anh-truc max-w-[180px] max-h-[180px] h-fit object-contain cursor-pointer rounded-lg hover:shadow-lg hover:scale-[1.23] z-[100] hover:z-[123] transition duration-300 ease-in-out" 
                                        alt="anh-truc"
                                 
                                    />
                                </div>  
                            </div>
                        `);
        }).join('')}
                </div>
                <p class="text-gray-800 p-4 text-[1.4rem] leading-[1.2]">${content}</p>
            </div>
        `);
    },
    slideImagePreviews: (image_url = '') => {
        ModalElement.style.display = 'flex';
        ModalElement.classList.remove('fade-out');
        setTimeout(() => {
            ModalElement.append(createVisualElement(`
                <div class="slide-item">
                    <img src="${image_url}" class="max-w-[500px] h-fit aspect-square object-contain rounded-lg " alt="anh-truc">
                </div>
            `));
            ModalElement.classList.add('fade-in');
        }, 100);
    }
}

function GenerateSlide() {
    Slide.slideItemImage.forEach((item, index) => {
        // console.log("index: ", index)
        const slideItem = Slide.slideItemContent([item], Slide.content[index]);
        Slide.slideArea.appendChild(
            createVisualElement(`
            <div class="slide bg-pink-100">
                ${slideItem.outerHTML}
                <div class="director">
                    <div 
                        class="${(index === 0) ? "hidden" : ""} flex justify-center items-center text-[20px] text-white w-14 h-14 cursor-pointer bg-[#cd00cdbf] rounded-full hover:scale-[1.23] transition duration-300 ease-in-out hover: " 
                        slide-index="${index}"
                        onclick="Slide.slideTransform(${index - 1 > 0 ? index - 1 : 0})"
                        >
                        ${Component.arrowLeft.outerHTML}
                    </div>
                    <div 
                        class="${(index === Slide.slideItemImage.length - 1) ? "hidden" : ""} flex justify-center items-center text-[20px] text-white w-14 h-14 cursor-pointer bg-[#cd00cdbf] rounded-full hover:scale-[1.23] transition duration-300 ease-in-out hover:" 
                        slide-data="${index + 2}"
                        onclick="Slide.slideTransform(${index + 1})"
                        >
                        ${Component.arrowRight.outerHTML}
                    </div>
                </div>
            </div>
        `)
        );
    });
}
function run() {
    db.ref('feedbacks').set({
        starRating,
        feedback
    }).then(() => {
        console.log('Feedback added');
        if (starRating > 3) {
            runBadCase();
        } else {
            runBadCase();
        }
    }).catch(err => {
        console.log(err);
    });
}

function runBadCase() {
    Slide.content = [
        "Valentine này tớ đã làm không tốt, một lần nữa tớ xin lỗi Trúc 😞, tớ chỉ mong Trúc luôn vui vẻ.... Làm sao có thể vui vẻ khi tớ đã làm như thế được chứ, tớ đã kh làm được điều mà lẽ ra tớ phải làm, đây là điều tớ cực kì day dứt từ những ngày đầu nghỉ tết ( đạo đức giả nhỉ, nói day dứt nhưng không làm )",
        "Tớ đã làm Trúc thất vọng, tớ xin lỗi Trúc, tớ chỉ mong Trúc luôn vui vẻ, tớ sẽ cố gắng hơn, tớ sẽ không làm Trúc thất vọng nữa",
        "Tớ mong bạn Trúc tóc đỏ xinh ngoan yêu của tớ luôn luôn vui vẻ, hạnh phúc khi ở bên tớ, dù tớ có nhiều thiếu sót nhưng tớ sẽ luôn luôn học hỏi để trở nên tốt hơn. Mong rằng từ nay về sau mình sẽ tiếp tục đồng hành cùng nhau, cùng nhau vượt qua những khó khăn nhé....Tớ iu Truc nhiều lắmmmm",
        "Tớ mong rằng hành trình của mình vẫn sẽ tiếp tục dài mãi mãi nên là hãy nắm lấy tay tớ rùi mình cùng đi nhé ",
        "Tớ nhớ Truc nhiều lắm, chỉ mong được gặp Truc thôi á",
    ];
    GenerateSlide();
}

function runGoodCase() {

}


$(document).ready(function () {
    var modal = $('.modal');
    var btn = $('button[type="submit"]');
    var span = $('.close');

    document.querySelector('button[type="submit"]').addEventListener('click', (e) => {
        e.preventDefault();
        modal.fadeIn(500);//.show();
        run();
    });

    span.click(function () {
        modal.fadeOut(500);
    });

    $(window).on('click', function (e) {
        if ($(e.target).is('.modal')) {
            modal.fadeOut(500);
        }
    });
});