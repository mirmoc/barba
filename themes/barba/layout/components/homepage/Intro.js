import barba from '@barba/core'
import { Component } from 'kapla'
import { gsap } from 'gsap'
import { $on, $off, qsa, qs } from '../../../source/js/utils/dom'

export default class extends Component {
  load() {
    this.$logoContainer = qs('.logo-container', this.$el)
    this.$logoHover = qs('.logo.only-big', this.$el)

    this.$logo = qs('.home-logo.logo svg', this.$el)
    this.$links = [...qsa('.home-logo.logo .links a', this.$el)]
    this.$texts = [...qsa('.intro__list li', this.$el)]
    this.$items = [...qsa('.only-big .hover .item', this.$el)]
    this.$list = qs('.intro__list', this.$el)

    this.mouseEnter = this.mouseEnter.bind(this)
    this.mouseLeave = this.mouseLeave.bind(this)

    this.$links.forEach((link, index) => {
      $on(link, 'mouseenter', () => this.mouseEnter(index))
      $on(link, 'mouseleave', () => this.mouseLeave(index))
    })

    // Play onboarding if it's the first page
    if (!barba.history.previous) {
      this.boarding()
    }

    // DEV
    // this.onResize();
  }

  boarding() {
    const logo = qs('.logo.home-logo', this.$el)
    const title = qsa('h1 span', this.$el)
    const buttons = qsa('.intro__buttons a', this.$el)
    const chrome = [
      qs('.header__infos'),
      qs('.header__external-links'),
      qs('.site-footer'),
    ]

    document.documentElement.classList.add('transitioning')

    const tl = gsap.timeline({
      delay: 0.5,
      onComplete: () => {
        document.documentElement.classList.remove('transitioning')
      },
    })

    tl.from(
      logo,
      {
        duration: 0.5,
        y: 100,
        scale: 1.1,
        ease: 'power4.inOut',
      },
      0
    )
      .from(
        title,
        {
          duration: 1,
          yPercent: 100,
          scale: 1,
          ease: 'power4',
          stagger: 0.05,
        },
        0.6
      )
      .from(
        buttons,
        {
          duration: 1,
          y: 40,
          opacity: 0,
          ease: 'power4',
          stagger: 0.05,
        },
        1.2
      )
      .from(
        chrome,
        {
          duration: 0.3,
          scale: 0,
          ease: 'power4',
          stagger: 0.2,
        },
        1.5
      )
  }

  destroy() {
    this.$links.forEach((link, index) => {
      $off(link, 'mouseenter', () => this.mouseEnter(index))
      $off(link, 'mouseleave', () => this.mouseLeave(index))
    })
  }

  mouseEnter(index) {
    this.$logo.classList.add('gray')

    gsap.killTweensOf(this.$texts[index])
    gsap.killTweensOf(this.$items[index])

    gsap.to(this.$items[index], {
      duration: 0.4,
      opacity: 1,
    })

    gsap.to(this.$texts[index], {
      duration: 0.2,
      opacity: 1,
      scale: 1,
    })

    gsap.to(this.$list, {
      duration: 0.4,
      yPercent: -(index * 100),
      ease: 'power4',
    })
  }

  mouseLeave(index) {
    if (barba.transitions.isRunning) {
      return
    }

    this.$logo.classList.remove('gray')

    gsap.killTweensOf(this.$texts[index])
    gsap.killTweensOf(this.$items[index])

    gsap.to(this.$items[index], {
      duration: 0.4,
      opacity: 0,
    })

    gsap.to(this.$texts[index], {
      duration: 0.2,
      opacity: 0,
      scale: 0.9,
    })
  }

  // DEV
  // onResize() {
  //   const bounds = this.$logo.getBoundingClientRect();

  //   this.$logoHover.style.top = `${bounds.top}px`;
  //   this.$logoHover.style.left = `${bounds.left}px`;
  //   this.$logoHover.style.right = `${bounds.right}px`;
  //   this.$logoHover.style.bottom = `${bounds.bottom}px`;
  // }
}

// BU
// import {
//   Component
// } from 'kapla';
// import anime from 'animejs';
// import {
//   $on,
//   qsa,
//   qs
// } from '../../../source/js/utils/dom';

// class Letter {
//   constructor(base, hover, big) {
//     this.base = base;
//     this.hover = hover;
//     this.big = big;
//   }
// }

// export default class extends Component {
//   load() {
//     this.$logoSvg = qs('svg', this.$el);
//     this.$logoLinks = [...qsa('.hover a', this.$el)];
//     this.$names = [...qsa('.name__list', this.$el)];

//     this.onEnterLogo = this.onEnterLogo.bind(this);
//     this.onLeaveLogo = this.onLeaveLogo.bind(this);

//     $on(this.$logoSvg, 'mouseenter', this.onEnterLogo);
//     $on(this.$logoSvg, 'mouseleave', this.onLeaveLogo);

//     function animate() {
//       const tl = anime.timeline({
//         loop: false,
//         easing: 'easeInOutQuart',
//       });

//       const vwidth = 568;
//       const vheight = 134;
//       const jsRound = 83;

//       const $js = document.querySelector('.base .js');
//       const $jsRect = document.querySelectorAll('.base .js__rect, .base .js__rect__alternate');
//       const $jsCircle = document.querySelector('.base .js__circle');
//       const $jsLetter = document.querySelector('.base .js__letter');
//       const $letters = document.querySelector('.base .letters');
//       const $chars = document.querySelectorAll('.base .letters rect, .base .letters circle, .base .letters path');

//       tl.add({
//         targets: $js,
//         transformOrigin: [`${jsRound / 2}px 67px 0px`, `${jsRound / 2}px 67px 0px`],
//         translateX: [(vwidth / 2) - (jsRound / 2), (vwidth / 2) - (jsRound / 2)],
//         translateY: [0, 0],
//         scale: {
//           value: [0, 1],
//           duration: 800,
//         },
//       });

//       tl.add({
//         targets: $jsRect,
//         height: [0, 128],
//         y: [0, -89],
//         opacity: {
//           value: [0, 1],
//           duration: 400,
//         },
//         duration: 800,
//       }, 400);

//       tl.add({
//         targets: $jsRect,
//         x: 41,
//         duration: 400,
//       });

//       tl.add({
//         targets: $jsRect,
//         y: -38,
//         height: 77,
//         duration: 400,
//       });

//       tl.add({
//         targets: $jsRect,
//         x: 0,
//         duration: 400,
//       });

//       tl.add({
//         targets: $jsCircle,
//         d: 'M0 0 C 0 -52 79 -52 79 0 C 79 0 0 0 0 0Z',
//         duration: 600,
//       });

//       var obj = {
//         rotation: 0
//       };

//       $jsCircle.style.transformOrigin = '40px 0px 0px';

//       tl.add({
//         targets: obj,
//         rotation: 360,
//         update: function (anim) {
//           $jsCircle.style.transform = `rotate(${obj.rotation}deg)`;

//           if (obj.rotation > 90) {
//             $js.classList.add('front');
//           }
//         },
//         duration: 800,
//       });

//       var obj2 = {
//         rotation: 0
//       };

//       tl.add({
//         targets: obj2,
//         rotation: 360,
//         update: function (anim) {
//           $jsCircle.style.transform = `rotate(${obj2.rotation}deg)`;

//           if (obj2.rotation > 90) {
//             $js.classList.remove('front');
//           }
//         },
//         duration: 800,
//       });

//       tl.add({
//         targets: $jsCircle,
//         d: 'M0 0 C 0 -52 79 -52 79 0 C 79 52 0 52 0 0Z',
//         duration: 600,
//       });

//       tl.add({
//         targets: $jsRect,
//         y: -89,
//         height: 128,
//         duration: 600,
//       });

//       tl.add({
//         targets: $jsRect,
//         x: 41,
//         duration: 400,
//       });

//       tl.add({
//         targets: $jsRect,
//         y: -38,
//         height: 77,
//         duration: 400,
//       });

//       tl.add({
//         targets: $jsRect,
//         y: 0,
//         height: 0,
//         duration: 400,
//       });

//       tl.add({
//         targets: $jsLetter,
//         // opacity: [0, 0],
//         translateX: [-1, -1],
//         translateY: [50, 50],
//         scale: [0, 1],
//         transformOrigin: ['40px 40px 0px', '40px 40px 0px'],
//         //   transform: translate(-1px, 50px) scale(0.9);
//         // transform-origin: 40px 40px;
//       });

//       tl.add({
//         targets: $js,
//         translateX: 486,
//         duration: 800,
//       });

//       tl.add({
//         targets: $chars,
//         delay: anime.stagger(40),
//         opacity: {
//           value: [0, 1],
//           duration: 200,
//         },
//         scale: {
//           value: [0.4, 1],
//           duration: 800,
//         },
//         rotate: {
//           value: ['120deg', '0deg'],
//           duration: 400,
//         },
//         translateX: {
//           value: [200, 0],
//           duration: 300,
//         },
//         translateY: {
//           value: [30, 0],
//           duration: 100,
//         },
//       }, '-=800')

//       tl.add({
//         targets: '.hover a',
//         delay: anime.stagger(40),
//         opacity: 0,
//       }, 1)

//     }

//     function hover() {
//       const $a = document.querySelectorAll('.hover a');
//       const $base = document.querySelector('.base');
//       const $names = [...document.querySelectorAll('.intro__list li')];

//       [...$a].forEach((link, index) => {
//         link.addEventListener('mouseenter', () => onMouseEnter(link, index));
//         link.addEventListener('mouseleave', () => onMouseLeave(link, index));
//       });

//       function onMouseEnter(link, index) {
//         anime.remove(link);
//         anime.remove($base);

//         // anime({
//         //   targets: $names,
//         //   opacity: 0,
//         //   translateY: -30,
//         //   easing: 'easeOutExpo',
//         //   duration: 400,
//         // })

//         anime.remove($names[index]);
//         anime({
//           targets: $names[index],
//           opacity: [0, 1],
//           translateY: [30, 0],
//           easing: 'easeOutExpo',
//           duration: 400,
//         })

//         anime({
//           targets: link,
//           opacity: 1,
//           easing: 'easeOutExpo',
//           duration: 400,
//         });

//         anime({
//           targets: $base,
//           stroke: '#E3E3E3',
//           easing: 'easeOutExpo',
//           duration: 400,
//         });
//       }

//       function onMouseLeave(e) {
//         anime.remove($a);
//         anime.remove($base);

//         anime({
//           targets: $names,
//           opacity: 0,
//           translateY: -30,
//           easing: 'easeOutExpo',
//           duration: 400,
//         })

//         anime({
//           targets: $a,
//           opacity: 0,
//           easing: 'easeOutExpo',
//           duration: 400,
//         });

//         anime({
//           targets: $base,
//           stroke: '#2E5BDC',
//           easing: 'easeOutExpo',
//           duration: 400,
//         });
//       }
//     }

//     hover();
//     // animate();
//   }

//   destroy() {
//     $on(this.$logoSvg, 'mouseenter', this.onEnterLogo);
//     $on(this.$logoSvg, 'mouseleave', this.onLeaveLogo);
//   }

//   onEnterLogo() {
//     this.$logoSvg.classList.add('gray');
//   }

//   onLeaveLogo() {
//     this.$logoSvg.classList.remove('gray');
//   }
// }
