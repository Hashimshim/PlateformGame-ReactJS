// These are the levels available in the game. To create a new Levels you just have to add a new level element to the
// Levels array - no further changes. Have a look at Blocks.js to get information about the different kinds of blocks
// that are available for your levels.

var Levels = [
    {
        name:"Level 1",
        description: 'Oh no <name> is going to be late for school again. We must arrive to the RDC class on time !',
        theme:'forrest',
        background: {
            color: '#3B9CFB',
            image: 'forrest'
        },
        foreground: '#FFC300',
        music: 'level_1',
        template:[
            "                                                                                                                                                      ",
            "                                                                                                                                                      ",
            "                                                                                                                                                      ",
            "                                                                                         h h h                                                        ",
            "                                                                                        h h h h                                                       ",
            "      y                       h                                                          h h h                                                        ",
            "                           DEEEEEF                             h       i       i        h h h h                                                       ",
            "                                                      .       DEF     DEF     DEF     DEEEEEEEEEEF             !!! h                                  ",
            "                          h h h h h                  1223                                                     !!!! h                                  ",
            "                         DEEEEEEEEEF           .     4556                                                    !!!!! h                                  ",
            "                                              1223   4556  !                                                !!!!!! h                                  ",
            "                            Y     YZ          4556   4556    =            , W   !   =         W            !!!!!!! h      .   Z        W   =        e ",
            "2222222222222222222222222222222222222222222227855AB27855AB22222222222222222222222222222222222222222222222222222222223    12222222222222222222222222222",
            "555555555555555555555555555555555555555555555555555555555555555555555555555555555555555555555555555555555555555555556HHHH45555555555555555555555555555"
        ]
    },
    {
        name:"Level 2",
        description: 'We need your help <name>. monsters have invaded RDJ.',
        theme:'winter',
        background: {
            color: '#000000',
            image: 'winter'
        },
        foreground: '#FFC300',
        music: 'level_2',
        template:[
            "                                                                                                                                                      ",
            "                                                         h                                                                                            ",
            "                                                     h   h   h                 h h h  h h h   h h h                                           iii     ",
            "      y                        h       h           h   h    h  h           <<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<          *     h/h h h *   hhh     DEF     ",
            "                               <       <        <<<<<<<<<<<<<<<<<<     <                             <   < *    /h h h h *            DEF             ",
            "                                                <      i   i     <                                                                                    ",
            "               h h h h h                        < * .h h h h h * <           *      ,     *                               DEF  DEF                    ",
            "              <<<<<<<<<<<     <<<     <<<      <<  <<<<<<<<<<<<  <         <<<<<<<<<<<<<<<<<<<   <               DEF DEF                              ",
            "                              <<<     <<<                                  h h h h h h <     <   <   <   <  h                                         ",
            "         T        .        .  <<<   . <<<             T         T      ;    h h h h h  <   T < . < . < . < hhh                           T  ;       e ",
            "222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222223                      12222222222222222",
            "555555555555555555555555555555555555555555555555555555555555555555555555555555555555555555555555555555555555556                      45555555555555555"
        ]
    },
    {
        name:"Level 3",
        description: 'Collect more books in your way to the 1st floor.',
        theme:'desert',
        background: {
            color: '#000000',
            image: 'desert'
        },
        foreground: '#000112',
        music: 'level_3',
        template:[
            "     §§     * h i=h h h h.h *  * h h,h h h h=i h *     e ",
            "     §§      §§§§§§§§§§§§§§§    §§§§§§§§§§§§§§§§§    §§§§",
            "     §§                                                  ",
            "  y  §§     * i.h *   *h h+h h=h i*  * h h=h h h *       ",
            "     §§      §§§§§    §§§§§§§§§§§§§   §§§§§§§§§§§        ",
            "     §§                                                  ",
            "     §§     * h h h,h i h *  * h h h,h h i *             ",
            "     §§      §§§§§§§§§§§§§    §§§§§§§§§§§§§              ",
            "                                                         ",
            "          *    +    *      .    *     =    =   *         ",
            "222222222222222222222222222222222222222222222222222222222",
            "555555555555555555555555555555555555555555555555555555555"
        ]
    },
    {
        name:"Level 4",
        description: 'This is your last destination <name>.Your main class is in the 2nd floor.Slay all monsters in the way and be there on time.',
        theme:'forrest',
        background: {
            color: '#000000',
            image: 'forrest'
        },
        foreground: '#FFC300',
        music: 'level_4',
        template:[
            "                                                                                                                                                      ",
            "                                                                                                                                                      ",
            "                                                                                                                           i                          ",
            "                                                         hh                                       hh        hh        hh   i                          ",
            "     y                         h h h h h h h            hhhh                                      !!   hh   !!   hh   !!   i                          ",
            "                              !!    !!    !!           !!!!!!!      hh      hhh              !!        !!        !!                                   ",
            "                                                                   1223 h  DEEEF                                                                      ",
            "                          !!                        !              4556 h                  !!                              *    /    *                ",
            "                                                                   4556 h                                                                             ",
            "                       !!                           DEEEEEEEEF     4556 h            c   !!                                         *b   b/  b  *     ",
            "                                                                   4556 h                                                                             ",
            "a       J   K   L     *    . K  .    *  J     ;        K*     =   *4556* .   .   .  *  !!                                        J     J   ;        e ",
            "2222222223  13  13  12222222222222222222222222222222222222222222222855A22222222222222222222223                                122222222222222222222222",
            "5555555556HH46HH46HH45555555555555555555555555555555555555555555555555555555555555555555555556HHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHH455555555555555555555555"
        ]
    }
];

module.exports = Levels;