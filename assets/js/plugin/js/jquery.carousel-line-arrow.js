(function ($) {
    jQuery.fn.carouselLineArrow = function (options) { //
        options = $.extend({
            lineDur: 5000, //duration of line-time animation (ms), default is 5000
            slideDur: 500, //duration of toggle slide animation (ms), default is 500
            heightIsProportional: true, // height of slider is proportional to the width when resized, defaultl is true
            linePosition: 'bottom', // position of line-time: 'bottom' or 'top', default is 'bottom'
            lineHeight: '5px', // height of line-time (px, em, rem, %), default is '5px';
            lineColor: 'red' // color of line-time, default is 'red'
        }, options);

        let make = function () {
            //реализация метода

            // стилизуем слайдер
            $(this).css('overflow', 'hidden');

            // узнаем соотношение сторон в картинке 
            let $this = $(this);
            let items = $(this).children(); //слайда
            let imgItem = items.first().children(); //
            let imgsItem = items.children(); //все картинки
            let imgWidth = imgItem.width(); //ширина картинки
            let imgHeight = imgItem.height(); //высота картинки
            let proportial = imgHeight / imgWidth; //соотн. сторон

            // костыль с padding-bottom для получения пропорционального слайдера
            $(this).wrap("<div class='carousel-wrapper-middle'></div>");
            $('.carousel-wrapper-middle').wrap("<div class='carousel-wrapper-outer'></div>");
            $('.carousel-wrapper-outer').css('width', '100%');
            $('.carousel-wrapper-middle').css('width', '100%');

            if (options.heightIsProportional) {
                $('.carousel-wrapper-middle').css('padding-bottom', (proportial * 100) + '%');
            } else {
                wrapperWidth = $('.carousel-wrapper-outer').width();
                $('.carousel-wrapper-middle').css('padding-bottom', imgHeight * wrapperWidth / imgWidth);
            }

            $('.carousel-wrapper-middle').css('position', 'relative');

            // устанавливаем абсолютное позиционирование для слайдов
            $(this).css('position', 'absolute');
            $(this).css('width', '100%');
            $(this).css('height', '100%');
            $(this).css('top', '0%');
            $(this).css('left', '0%');
            items.css('position', 'absolute');
            items.css('width', '100%');
            items.css('height', '100%');
            items.css('top', '0%');
            items.css('left', '0%');
            //imgsItem.css('max-width', '100%');
            imgsItem.css('width', '100%');
            imgsItem.css('height', '100%');
            imgsItem.css('object-fit', 'cover');

            items.css('display', 'none');
            items.eq(0).css('display', 'block');

            ///////////////////////////////////////////
            //создаем полосу длительности показа слайда
            ////////////////////////////////////////////
            $(this).append('<div class="carouselLineArrow-line"><div class="carouselLineArrow-innerline"></div></div>');
            let line = $(this).children('.carouselLineArrow-line');
            // стилизуем line, innerLine
            // if (options.linePosition == 'bottom') {
            //     line.css('bottom', '0');
            // } else {
            //     line.css('top', '0');
            // }
            line.css(options.linePosition, '0');
            line.css('height', options.lineHeight);
            let innerLine = line.children('.carouselLineArrow-innerline');
            innerLine.css('background-color', options.lineColor);
          
            //////////////////////////////////////////////
            /////////  создаем стрелки ///////////////////
            //////////////////////////////////////////////
            $(this).append('<div class="carouselLineArrow-arrow carouselLineArrow-arrow-right"><div class="carouselLineArrow-arrow-inner"></div></div>');
            $(this).append('<div class="carouselLineArrow-arrow carouselLineArrow-arrow-left"><div class="carouselLineArrow-arrow-inner"></div></div>')
            let arrowLeft = $this.children('.carouselLineArrow-arrow-left');
            let arrowRight = $this.children('.carouselLineArrow-arrow-right');

            // параметры
            let iLast = items.length - 1; // индекс последнего слайда
            let iCurr = 0;
            let iNext; // индекс следующего
            let iPrev; // индекс предыдущего
            let sliderHover = false; //мышь над слайдером
            // нужен для проверки: запускать ли анимацию на Line
            let lineIsAnim = false; // на line есть анимация
            let slideIsAnim = false; // на slide есть анимация


            // функции определения следующего и предыдущего индекса
            function nextI(i) {
                return (i < iLast) ? i + 1 : 0;
            }

            function prevI(i) {
                return (i > 0) ? i - 1 : iLast;
            }

            ////////////////////////////////////////////
            ////функция после анимации слайда (влево)///
            ////////////////////////////////////////////
            function afterSlideAnimateLeft() {
                // переключение параметра статуса анимации
                slideIsAnim = false;
                //console.log(`slideIsAnim = ${slideIsAnim}`);

                // текущий слайд iCurr скрывается
                //items.eq(iCurr).css('display', 'none');

                // все кроме нового текущего iCurr скрываются
                items.each(function (index) {
                    if (index !== iCurr) {
                        items.eq(index).css('display', 'none');
                    }

                });

                // // определяется новый iCurr
                // if (iCurr < iLast) {
                //     iCurr++;
                // } else {
                //     iCurr = 0;
                // }

                //запускается анимация на Line
                // переключение параметра статуса анимации
                lineIsAnim = true;
                //console.log(`lineIsAnim = ${lineIsAnim}`);
                if (!sliderHover) {
                    innerLine.animate({
                        'width': '100%'
                    }, options.lineDur, afterLineAnimateLeft);
                }
            }

            ///////////////////////////////////////////////////////
            ////функция после анимации линии (слайды идет влево)///
            ///////////////////////////////////////////////////////
            function afterLineAnimateLeft() {
                // переключение параметра статуса анимации
                lineIsAnim = false;
                //console.log(`lineIsAnim = ${lineIsAnim}`);
                // положение Line обнуляется
                innerLine.css('width', '0');
                // известен iCurr
                // определение iNext
                iNext = nextI(iCurr);
                //console.log(iNext);
                // слайды iCurr и iNext делаются видимыми
                items.eq(iCurr).css('display', 'block');
                items.eq(iNext).css('display', 'block');

                // спозиционировать слайд-Curr по 0
                items.eq(iCurr).css('left', '0%');
                // спозиционировать слайд-iNext справо от сладера-iCurr
                items.eq(iNext).css('left', '99%');

                // переключение параметра статуса анимации
                slideIsAnim = true;
                //console.log(`slideIsAnim = ${slideIsAnim}`);

                // запустить анимацию сдвига на слайдах iCurr и iNext
                // и в конце этой анимации запустить функцию afterSlideAnimate
                // в которой определяется новый iCurr и запускается анимация на Line
                items.eq(iCurr).animate({
                    left: '-99%'
                }, options.slideDur, afterSlideAnimateLeft);

                items.eq(iNext).animate({
                    left: '0%'
                }, options.slideDur);

                // определяется новый iCurr
                if (iCurr < iLast) {
                    iCurr++;
                } else {
                    iCurr = 0;
                }

            }

            ///////////////////////////////////////////////////////
            ////функция после анимации линии (слайды идут вправо)///
            ///////////////////////////////////////////////////////
            function afterLineAnimateRight() {
                // переключение параметра статуса анимации
                lineIsAnim = false;
                //console.log(`lineIsAnim = ${lineIsAnim}`);
                // положение Line обнуляется
                innerLine.css('width', '0');
                // известен iCurr
                // определение iNext
                iPrev = prevI(iCurr);
                //console.log(iNext);
                // слайды iCurr и iNext делаются видимыми
                items.eq(iCurr).css('display', 'block');
                items.eq(iPrev).css('display', 'block');

                // спозиционировать слайд-Curr по 0
                items.eq(iCurr).css('left', '0%');
                // спозиционировать слайд-iPrev слево от сладера-iCurr
                items.eq(iPrev).css('left', '-99%');

                // переключение параметра статуса анимации
                slideIsAnim = true;
                //console.log(`slideIsAnim = ${slideIsAnim}`);

                // запустить анимацию сдвига на слайдах iCurr и iPrev
                // и в конце этой анимации запустить функцию afterSlideAnimate
                // в которой определяется новый iCurr и запускается анимация на Line
                items.eq(iCurr).animate({
                    left: '99%'
                }, options.slideDur, afterSlideAnimateLeft);

                items.eq(iPrev).animate({
                    left: '0%'
                }, options.slideDur);

                //определяется новый iCurr
                if (iCurr > 0) {
                    iCurr--;
                } else {
                    iCurr = iLast;
                }


            }

            //////////////////////////////////
            // первый запуск анимации линии///
            //////////////////////////////////
            // переключение параметра статуса анимации
            lineIsAnim = true;
            //console.log(`lineIsAnim = ${lineIsAnim}`);
            if (!sliderHover) {
                innerLine.animate({
                    'width': '100%'
                }, options.lineDur, afterLineAnimateLeft);
            }

            /////////////////////////////////////////
            //////// мышка входит на slide/////////
            /////////////////////////////////////////
            $(this).on('mouseenter', function () {
                sliderHover = true;
                //console.log('stop');
                if (lineIsAnim) { // если линия анимирована
                    // удалить анимацию на линии
                    innerLine.stop();
                    innerLine.css('width', '0%');
                    lineIsAnim = false;
                }
            });

            /////////////////////////////////////////
            //////// мышка уходит из slide/////////
            /////////////////////////////////////////
            $(this).on('mouseleave', function () {
                sliderHover = false;
                // если вывели мышку после того как ввели ее во время анимации линии
                // или после того как ввели ее во время анимации слайда и она закончилась
                // в этих двух случаях нет анимации слайда

                if (!slideIsAnim) {
                    // тоже что и первый запуск анимации линии
                    //console.log('запускаем заново')
                    lineIsAnim = true;
                    //console.log(`lineIsAnim = ${lineIsAnim}`);
                    if (!sliderHover) {
                        innerLine.animate({
                            'width': '100%'
                        }, options.lineDur, afterLineAnimateLeft);
                    }
                }
            });

            ////////////////////////////////
            ////// СТРЕЛКА ВЛЕВО //////////
            ////////////////////////////////
            arrowLeft.on('click', function () {
                if (!slideIsAnim) {
                    afterLineAnimateLeft();
                }
            });

            ////////////////////////////////
            ////// СТРЕЛКА ВПРАВО //////////
            ////////////////////////////////
            arrowRight.on('click', function () {
                if (!slideIsAnim) {
                    afterLineAnimateRight();
                }
            });

        };
        return this.each(make);

    };
})(jQuery);