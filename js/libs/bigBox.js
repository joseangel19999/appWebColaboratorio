(function() {



    $.bigBox = function(opciones, callback) {
        opciones = $.extend({
            icono: '',
            titulo: undefined,
            texto: undefined,
            textoBoton: undefined,
        }, opciones);

        if (opciones.titulo === undefined) {
            alert("El titulo es necesario");
            return;
        }
        if (opciones.texto === undefined) {
            alert("El Texto es necesario");
            return;
        }
        var contenido = "";
        contenido = '<div class="bigBox-Fondo"></div>';

        contenido += '<div class="biGBox-Contenedor">';
        contenido += '<div class="BigBox-Cerrar"><i class="bx bx-x"></i></div>';
        contenido += '<div class="bigBox-Circulo"> <i class="' + opciones.icono + '"></i></div>';
        contenido += '<div class="bigBox-Contenido">';
        contenido += '<span class="bigBox-Titulo">' + opciones.titulo + '</span>';
        contenido += '<span class="bigBox-Texto">' + opciones.texto + '</span>';
        contenido += '</div>';
        contenido += '<button class="bigBox-Boton" >' + opciones.textoBoton + '</button>';
        contenido += '</div>';
        $("body").append(contenido);

        animacion_entrada();
        /* funcion cerrar  lr decimos que detecte un  evento en el bpdy pero del bigbox-cerrar*/
        $(".BigBox-Cerrar").on("click", function() {
            animacionCerrar();
            /* el typeof se usa para saber que tipo de dato */
            if (typeof callback === "function") {
                callback('boton-cerrar');
            }
        });
        $(".bigBox-Boton").on("click", function() {
            if (typeof callback === "function") {
                callback("bigBox-Boton");
            }
        });
        /* animar la entrada */
        function animacion_entrada() {
            var $fondo = $(".bigBox-Fondo");
            var $bigBox = $(".biGBox-Contenedor");

            var anchoP = $(window).width();
            var altoP = $(window).height();
            var anchoB = $bigBox.width();
            var altoB = $bigBox.height();

            $bigBox.css({
                    top: (altoP / 2) - (altoB / 2),
                    left: (anchoP / 2) - (anchoB / 2)
                })
                /*  $fondo.fadeIn(300); */
            $fondo.show();
            $bigBox.show();
            var tl = gsap.timeline();
            tl.to($fondo, 0.5, { opacity: 0.3 })
                .to($bigBox, 0.5, { opacity: 1 }, "-=0.5")
                .from($bigBox, 1, { y: "-=20", ease: "bounce.out" }, "-=0.5")

        }

    };
    /* animacion cerrar */
    function animacionCerrar() {
        var $fondo = $(".bigBox-Fondo");
        var $bigBox = $(".biGBox-Contenedor");
        var tl = gsap.timeline();
        tl.to($fondo, 0.3, { opacity: 0 })
            .to($bigBox, 0.3, { opacity: 0, onComplete: removerBigBox }, "-=0.5");
    }
    /* removel elementos en el dom */
    function removerBigBox() {
        var $fondo = $(".bigBox-Fondo");
        var $bigBox = $(".biGBox-Contenedor");
        $fondo.remove();
        $bigBox.remove();
    }
})();