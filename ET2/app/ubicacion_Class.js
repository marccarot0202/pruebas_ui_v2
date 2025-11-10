class ubicacion extends EntidadAbstracta {

    constructor(esTest) {
        super(esTest);

        this.columnasamostrar = ['id_site', 'site_locality', 'site_latitud', 'site_longitud', 'site_provider_login'];
        this.mostrarespecial = ['site_north_photo', 'site_south_photo', 'site_east_photo', 'site_west_photo'];

        this.attributes = [
            'id_site',
            'site_latitud',
            'site_longitud',
            'site_altitude',
            'site_locality',
            'site_provider_login',
            'site_north_photo',
            'site_south_photo',
            'site_east_photo',
            'site_west_photo',
            'nuevo_site_north_photo',
            'nuevo_site_south_photo',
            'nuevo_site_east_photo',
            'nuevo_site_west_photo'
        ];
    }

    crearTablaDatos(datos, mostrarespeciales) {
        const filasOriginales = datos.map((fila) => ({ ...fila }));
        const filasTabla = datos.map((fila) => ({ ...fila }));

        if (mostrarespeciales.length > 0) {
            for (let i = 0; i < filasTabla.length; i++) {
                for (const clave in filasTabla[i]) {
                    if (mostrarespeciales.includes(clave)) {
                        filasTabla[i][clave] = this.mostrarcambioatributo(clave, filasTabla[i][clave]);
                    }
                }
            }
        }

        for (let i = 0; i < filasTabla.length; i++) {
            const originalFila = filasOriginales[i];
            const datosSerializados = encodeURIComponent(JSON.stringify(originalFila));
            const llamada = `JSON.parse(decodeURIComponent(\"${datosSerializados}\"))`;
            filasTabla[i].EDIT = `<img id='botonEDIT' src='./iconos/EDIT.png' onclick='entidad.createForm_EDIT(${llamada});'>`;
            filasTabla[i].DELETE = `<img id='botonDELETE' src='./iconos/DELETE.png' onclick='entidad.createForm_DELETE(${llamada});'>`;
            filasTabla[i].SHOWCURRENT = `<img id='botonSHOWCURRENT' src='./iconos/SHOWCURRENT.png' onclick='entidad.createForm_SHOWCURRENT(${llamada});'>`;
        }

        this.dom.showData('IU_manage_table', filasTabla);
        this.mostrarocultarcolumnas();
        this.dom.crearSeleccionablecolumnas(this.columnasamostrar, this.atributos);
    }

    manual_form_creation() {
        return `
            <form id='form_iu' action="" method="POST" enctype="multipart/form-data" onsubmit="" class='formulario'>
                <label class='label_id_site'>id_site</label>
                <input type='text' id='id_site' name='id_site'/>
                <span id='span_error_id_site'><a id='error_id_site'></a></span>
                <br>
                <label class='label_site_latitud'>site_latitud</label>
                <input type='text' id='site_latitud' name='site_latitud'/>
                <span id='span_error_site_latitud'><a id='error_site_latitud'></a></span>
                <br>
                <label class='label_site_longitud'>site_longitud</label>
                <input type='text' id='site_longitud' name='site_longitud'/>
                <span id='span_error_site_longitud'><a id='error_site_longitud'></a></span>
                <br>
                <label class='label_site_altitude'>site_altitude</label>
                <input type='text' id='site_altitude' name='site_altitude'/>
                <span id='span_error_site_altitude'><a id='error_site_altitude'></a></span>
                <br>
                <label class='label_site_locality'>site_locality</label>
                <input type='text' id='site_locality' name='site_locality'/>
                <span id='span_error_site_locality'><a id='error_site_locality'></a></span>
                <br>
                <label class='label_site_provider_login'>site_provider_login</label>
                <input type='text' id='site_provider_login' name='site_provider_login'/>
                <span id='span_error_site_provider_login'><a id='error_site_provider_login'></a></span>
                <br>
                <label id='label_site_north_photo' class='label_site_north_photo'>site_north_photo</label>
                <input type='text' id='site_north_photo' name='site_north_photo'/>
                <span id='span_error_site_north_photo'><a id='error_site_north_photo'></a></span>
                <a id='link_site_north_photo' href='' target='_blank'><img src='./iconos/FILE.png' /></a>
                <br>
                <label id='label_nuevo_site_north_photo' class='label_nuevo_site_north_photo'>nuevo_site_north_photo</label>
                <input type='file' id='nuevo_site_north_photo' name='nuevo_site_north_photo'/>
                <span id='span_error_nuevo_site_north_photo'><a id='error_nuevo_site_north_photo'></a></span>
                <br>
                <label id='label_site_south_photo' class='label_site_south_photo'>site_south_photo</label>
                <input type='text' id='site_south_photo' name='site_south_photo'/>
                <span id='span_error_site_south_photo'><a id='error_site_south_photo'></a></span>
                <a id='link_site_south_photo' href='' target='_blank'><img src='./iconos/FILE.png' /></a>
                <br>
                <label id='label_nuevo_site_south_photo' class='label_nuevo_site_south_photo'>nuevo_site_south_photo</label>
                <input type='file' id='nuevo_site_south_photo' name='nuevo_site_south_photo'/>
                <span id='span_error_nuevo_site_south_photo'><a id='error_nuevo_site_south_photo'></a></span>
                <br>
                <label id='label_site_east_photo' class='label_site_east_photo'>site_east_photo</label>
                <input type='text' id='site_east_photo' name='site_east_photo'/>
                <span id='span_error_site_east_photo'><a id='error_site_east_photo'></a></span>
                <a id='link_site_east_photo' href='' target='_blank'><img src='./iconos/FILE.png' /></a>
                <br>
                <label id='label_nuevo_site_east_photo' class='label_nuevo_site_east_photo'>nuevo_site_east_photo</label>
                <input type='file' id='nuevo_site_east_photo' name='nuevo_site_east_photo'/>
                <span id='span_error_nuevo_site_east_photo'><a id='error_nuevo_site_east_photo'></a></span>
                <br>
                <label id='label_site_west_photo' class='label_site_west_photo'>site_west_photo</label>
                <input type='text' id='site_west_photo' name='site_west_photo'/>
                <span id='span_error_site_west_photo'><a id='error_site_west_photo'></a></span>
                <a id='link_site_west_photo' href='' target='_blank'><img src='./iconos/FILE.png' /></a>
                <br>
                <label id='label_nuevo_site_west_photo' class='label_nuevo_site_west_photo'>nuevo_site_west_photo</label>
                <input type='file' id='nuevo_site_west_photo' name='nuevo_site_west_photo'/>
                <span id='span_error_nuevo_site_west_photo'><a id='error_nuevo_site_west_photo'></a></span>
            </form>
        `;
    }

    mostrarcambioatributo(atributo, valorentrada) {
        if (!valorentrada) {
            return '';
        }
        const base = 'http://193.147.87.202/ET2/filesuploaded/';
        switch (atributo) {
            case 'site_north_photo':
                return `${valorentrada}  <a class='link_site_north_photo' href='${base}files_site_north_photo/${valorentrada}' target='_blank'><img src='./iconos/FILE.png' /></a>`;
            case 'site_south_photo':
                return `${valorentrada}  <a class='link_site_south_photo' href='${base}files_site_south_photo/${valorentrada}' target='_blank'><img src='./iconos/FILE.png' /></a>`;
            case 'site_east_photo':
                return `${valorentrada}  <a class='link_site_east_photo' href='${base}files_site_east_photo/${valorentrada}' target='_blank'><img src='./iconos/FILE.png' /></a>`;
            case 'site_west_photo':
                return `${valorentrada}  <a class='link_site_west_photo' href='${base}files_site_west_photo/${valorentrada}' target='_blank'><img src='./iconos/FILE.png' /></a>`;
            default:
                return valorentrada;
        }
    }

    createForm_ADD() {
        document.getElementById('contenedor_IU_form').innerHTML = this.manual_form_creation();
        this.dom.show_element('Div_IU_form', 'block');
        this.dom.remove_class_value('class_contenido_titulo_form', 'text_contenido_titulo_form');
        this.dom.assign_class_value('class_contenido_titulo_form', 'text_contenido_titulo_form_ubicacion_ADD');

        this.dom.assign_property_value('form_iu', 'onsubmit', 'return entidad.ADD_submit_' + this.nombreentidad + '()');
        this.dom.assign_property_value('form_iu', 'action', 'javascript:entidad.ADD();');

        const camposFichero = ['site_north_photo', 'site_south_photo', 'site_east_photo', 'site_west_photo'];
        camposFichero.forEach(id => {
            this.dom.hide_element('label_' + id);
            this.dom.hide_element(id);
            this.dom.hide_element('link_' + id);
        });
        const nuevos = ['nuevo_site_north_photo', 'nuevo_site_south_photo', 'nuevo_site_east_photo', 'nuevo_site_west_photo'];
        nuevos.forEach(id => {
            document.getElementById('label_' + id).style.display = 'block';
            document.getElementById(id).style.display = 'block';
        });

        this.dom.colocarvalidaciones('form_iu', 'ADD');
        this.dom.colocarboton('ADD');
        setLang();
    }

    createForm_EDIT(fila) {
        document.getElementById('contenedor_IU_form').innerHTML = this.manual_form_creation();
        this.dom.show_element('Div_IU_form', 'block');
        this.dom.remove_class_value('class_contenido_titulo_form', 'text_contenido_titulo_form');
        this.dom.assign_class_value('class_contenido_titulo_form', 'text_contenido_titulo_form_ubicacion_EDIT');

        this.dom.assign_property_value('form_iu', 'onsubmit', 'return entidad.EDIT_submit_' + this.nombreentidad + '()');
        this.dom.assign_property_value('form_iu', 'action', 'javascript:entidad.EDIT();');

        this.actualizarEnlacesFotos(fila);
        this.dom.rellenarvaloresform(fila);

        this.dom.colocarvalidaciones('form_iu', 'EDIT');

        ['site_north_photo', 'site_south_photo', 'site_east_photo', 'site_west_photo'].forEach(id => {
            this.dom.assign_property_value(id, 'readonly', 'true');
            document.getElementById('label_' + id).style.display = 'block';
            document.getElementById(id).style.display = 'block';
            document.getElementById('link_' + id).style.display = 'inline-block';
        });
        ['nuevo_site_north_photo', 'nuevo_site_south_photo', 'nuevo_site_east_photo', 'nuevo_site_west_photo'].forEach(id => {
            document.getElementById('label_' + id).style.display = 'block';
            document.getElementById(id).style.display = 'block';
        });

        this.dom.colocarboton('EDIT');
        setLang();
    }

    createForm_DELETE(fila) {
        document.getElementById('contenedor_IU_form').innerHTML = this.manual_form_creation();
        this.dom.show_element('Div_IU_form', 'block');
        this.dom.remove_class_value('class_contenido_titulo_form', 'text_contenido_titulo_form');
        this.dom.assign_class_value('class_contenido_titulo_form', 'text_contenido_titulo_form_ubicacion_DELETE');

        this.dom.assign_property_value('form_iu', 'action', 'javascript:entidad.DELETE();');

        this.actualizarEnlacesFotos(fila);
        this.dom.rellenarvaloresform(fila);

        this.dom.colocartodosreadonly('form_iu');

        ['site_north_photo', 'site_south_photo', 'site_east_photo', 'site_west_photo'].forEach(id => {
            document.getElementById('label_' + id).style.display = 'block';
            document.getElementById(id).style.display = 'block';
            document.getElementById('link_' + id).style.display = 'inline-block';
        });
        ['nuevo_site_north_photo', 'nuevo_site_south_photo', 'nuevo_site_east_photo', 'nuevo_site_west_photo'].forEach(id => {
            this.dom.hide_element('label_' + id);
            this.dom.hide_element(id);
        });

        this.dom.colocarboton('DELETE');
        setLang();
    }

    createForm_SHOWCURRENT(fila) {
        document.getElementById('contenedor_IU_form').innerHTML = this.manual_form_creation();
        this.dom.show_element('Div_IU_form', 'block');
        this.dom.remove_class_value('class_contenido_titulo_form', 'text_contenido_titulo_form');
        this.dom.assign_class_value('class_contenido_titulo_form', 'text_contenido_titulo_form_ubicacion_SHOWCURRENT');

        this.actualizarEnlacesFotos(fila);
        this.dom.rellenarvaloresform(fila);
        this.dom.colocartodosreadonly('form_iu');

        ['site_north_photo', 'site_south_photo', 'site_east_photo', 'site_west_photo'].forEach(id => {
            document.getElementById('label_' + id).style.display = 'block';
            document.getElementById(id).style.display = 'block';
            document.getElementById('link_' + id).style.display = 'inline-block';
        });
        ['nuevo_site_north_photo', 'nuevo_site_south_photo', 'nuevo_site_east_photo', 'nuevo_site_west_photo'].forEach(id => {
            this.dom.hide_element('label_' + id);
            this.dom.hide_element(id);
        });
        setLang();
    }

    createForm_SEARCH() {
        document.getElementById('contenedor_IU_form').innerHTML = this.manual_form_creation();
        this.dom.show_element('Div_IU_form', 'block');
        this.dom.remove_class_value('class_contenido_titulo_form', 'text_contenido_titulo_form');
        this.dom.assign_class_value('class_contenido_titulo_form', 'text_contenido_titulo_form_ubicacion_SEARCH');

        this.dom.assign_property_value('form_iu', 'onsubmit', 'return entidad.SEARCH_submit_' + this.nombreentidad + '()');
        this.dom.assign_property_value('form_iu', 'action', 'javascript:entidad.SEARCH();');

        ['site_north_photo', 'site_south_photo', 'site_east_photo', 'site_west_photo'].forEach(id => {
            document.getElementById('label_' + id).style.display = 'block';
            document.getElementById(id).style.display = 'block';
            document.getElementById(id).removeAttribute('readonly');
        });
        ['link_site_north_photo', 'link_site_south_photo', 'link_site_east_photo', 'link_site_west_photo'].forEach(id => {
            this.dom.hide_element(id);
        });
        ['nuevo_site_north_photo', 'nuevo_site_south_photo', 'nuevo_site_east_photo', 'nuevo_site_west_photo'].forEach(id => {
            this.dom.hide_element('label_' + id);
            this.dom.hide_element(id);
        });

        this.dom.colocarvalidaciones('form_iu', 'SEARCH');
        this.dom.colocarboton('SEARCH');
        setLang();
    }

    actualizarEnlacesFotos(fila) {
        const base = 'http://193.147.87.202/ET2/filesuploaded/';
        if (fila.site_north_photo) {
            this.dom.assign_property_value('link_site_north_photo', 'href', base + 'files_site_north_photo/' + fila.site_north_photo);
        }
        if (fila.site_south_photo) {
            this.dom.assign_property_value('link_site_south_photo', 'href', base + 'files_site_south_photo/' + fila.site_south_photo);
        }
        if (fila.site_east_photo) {
            this.dom.assign_property_value('link_site_east_photo', 'href', base + 'files_site_east_photo/' + fila.site_east_photo);
        }
        if (fila.site_west_photo) {
            this.dom.assign_property_value('link_site_west_photo', 'href', base + 'files_site_west_photo/' + fila.site_west_photo);
        }
    }

    ADD_id_site_validation() {
        if (!this.validations.format('id_site', '^[0-9]+$')) {
            this.dom.mostrar_error_campo('id_site', 'id_site_format_KO');
            return 'id_site_format_KO';
        }
        this.dom.mostrar_exito_campo('id_site');
        return true;
    }

    ADD_site_latitud_validation() {
        const valor = document.getElementById('site_latitud').value;
        if (!this.validations.format('site_latitud', '^-?[0-9]{1,3}(\\.[0-9]{1,6})?$')) {
            this.dom.mostrar_error_campo('site_latitud', 'site_latitud_format_KO');
            return 'site_latitud_format_KO';
        }
        const numero = parseFloat(valor);
        if (numero < -90 || numero > 90) {
            this.dom.mostrar_error_campo('site_latitud', 'site_latitud_range_KO');
            return 'site_latitud_range_KO';
        }
        this.dom.mostrar_exito_campo('site_latitud');
        return true;
    }

    ADD_site_longitud_validation() {
        const valor = document.getElementById('site_longitud').value;
        if (!this.validations.format('site_longitud', '^-?[0-9]{1,3}(\\.[0-9]{1,6})?$')) {
            this.dom.mostrar_error_campo('site_longitud', 'site_longitud_format_KO');
            return 'site_longitud_format_KO';
        }
        const numero = parseFloat(valor);
        if (numero < -180 || numero > 180) {
            this.dom.mostrar_error_campo('site_longitud', 'site_longitud_range_KO');
            return 'site_longitud_range_KO';
        }
        this.dom.mostrar_exito_campo('site_longitud');
        return true;
    }

    ADD_site_altitude_validation() {
        const valor = document.getElementById('site_altitude').value;
        if (!this.validations.format('site_altitude', '^-?[0-9]{1,4}$')) {
            this.dom.mostrar_error_campo('site_altitude', 'site_altitude_format_KO');
            return 'site_altitude_format_KO';
        }
        const numero = parseInt(valor, 10);
        if (numero < -500 || numero > 9000) {
            this.dom.mostrar_error_campo('site_altitude', 'site_altitude_range_KO');
            return 'site_altitude_range_KO';
        }
        this.dom.mostrar_exito_campo('site_altitude');
        return true;
    }

    ADD_site_locality_validation() {
        if (!this.validations.min_size('site_locality', 3)) {
            this.dom.mostrar_error_campo('site_locality', 'site_locality_min_size_KO');
            return 'site_locality_min_size_KO';
        }
        if (!this.validations.max_size('site_locality', 40)) {
            this.dom.mostrar_error_campo('site_locality', 'site_locality_max_size_KO');
            return 'site_locality_max_size_KO';
        }
        if (!this.validations.format('site_locality', "^[A-Za-zÁÉÍÓÚÜÑáéíóúüñ -]+$")) {
            this.dom.mostrar_error_campo('site_locality', 'site_locality_format_KO');
            return 'site_locality_format_KO';
        }
        this.dom.mostrar_exito_campo('site_locality');
        return true;
    }

    ADD_site_provider_login_validation() {
        if (!this.validations.min_size('site_provider_login', 3)) {
            this.dom.mostrar_error_campo('site_provider_login', 'site_provider_login_min_size_KO');
            return 'site_provider_login_min_size_KO';
        }
        if (!this.validations.max_size('site_provider_login', 30)) {
            this.dom.mostrar_error_campo('site_provider_login', 'site_provider_login_max_size_KO');
            return 'site_provider_login_max_size_KO';
        }
        if (!this.validations.format('site_provider_login', '^[A-Za-z0-9_-]+$')) {
            this.dom.mostrar_error_campo('site_provider_login', 'site_provider_login_format_KO');
            return 'site_provider_login_format_KO';
        }
        this.dom.mostrar_exito_campo('site_provider_login');
        return true;
    }

    ADD_site_north_photo_validation() { this.dom.mostrar_exito_campo('site_north_photo'); return true; }
    ADD_site_south_photo_validation() { this.dom.mostrar_exito_campo('site_south_photo'); return true; }
    ADD_site_east_photo_validation() { this.dom.mostrar_exito_campo('site_east_photo'); return true; }
    ADD_site_west_photo_validation() { this.dom.mostrar_exito_campo('site_west_photo'); return true; }

    ADD_nuevo_site_north_photo_validation() {
        return this.validar_fichero_imagen('nuevo_site_north_photo', 'nuevo_site_north_photo_not_exist_file_KO', 'nuevo_site_north_photo_type_file_KO', 'nuevo_site_north_photo_max_size_file_KO', 'nuevo_site_north_photo_format_name_file_KO');
    }
    ADD_nuevo_site_south_photo_validation() {
        return this.validar_fichero_imagen('nuevo_site_south_photo', 'nuevo_site_south_photo_not_exist_file_KO', 'nuevo_site_south_photo_type_file_KO', 'nuevo_site_south_photo_max_size_file_KO', 'nuevo_site_south_photo_format_name_file_KO');
    }
    ADD_nuevo_site_east_photo_validation() {
        return this.validar_fichero_imagen('nuevo_site_east_photo', 'nuevo_site_east_photo_not_exist_file_KO', 'nuevo_site_east_photo_type_file_KO', 'nuevo_site_east_photo_max_size_file_KO', 'nuevo_site_east_photo_format_name_file_KO');
    }
    ADD_nuevo_site_west_photo_validation() {
        return this.validar_fichero_imagen('nuevo_site_west_photo', 'nuevo_site_west_photo_not_exist_file_KO', 'nuevo_site_west_photo_type_file_KO', 'nuevo_site_west_photo_max_size_file_KO', 'nuevo_site_west_photo_format_name_file_KO');
    }

    EDIT_id_site_validation() { return this.ADD_id_site_validation(); }
    EDIT_site_latitud_validation() { return this.ADD_site_latitud_validation(); }
    EDIT_site_longitud_validation() { return this.ADD_site_longitud_validation(); }
    EDIT_site_altitude_validation() { return this.ADD_site_altitude_validation(); }
    EDIT_site_locality_validation() { return this.ADD_site_locality_validation(); }
    EDIT_site_provider_login_validation() { return this.ADD_site_provider_login_validation(); }
    EDIT_site_north_photo_validation() { return true; }
    EDIT_site_south_photo_validation() { return true; }
    EDIT_site_east_photo_validation() { return true; }
    EDIT_site_west_photo_validation() { return true; }

    EDIT_nuevo_site_north_photo_validation() {
        return this.validar_fichero_opcional('nuevo_site_north_photo', 'nuevo_site_north_photo_type_file_KO', 'nuevo_site_north_photo_max_size_file_KO', 'nuevo_site_north_photo_format_name_file_KO');
    }
    EDIT_nuevo_site_south_photo_validation() {
        return this.validar_fichero_opcional('nuevo_site_south_photo', 'nuevo_site_south_photo_type_file_KO', 'nuevo_site_south_photo_max_size_file_KO', 'nuevo_site_south_photo_format_name_file_KO');
    }
    EDIT_nuevo_site_east_photo_validation() {
        return this.validar_fichero_opcional('nuevo_site_east_photo', 'nuevo_site_east_photo_type_file_KO', 'nuevo_site_east_photo_max_size_file_KO', 'nuevo_site_east_photo_format_name_file_KO');
    }
    EDIT_nuevo_site_west_photo_validation() {
        return this.validar_fichero_opcional('nuevo_site_west_photo', 'nuevo_site_west_photo_type_file_KO', 'nuevo_site_west_photo_max_size_file_KO', 'nuevo_site_west_photo_format_name_file_KO');
    }

    SEARCH_id_site_validation() {
        const valor = document.getElementById('id_site').value;
        if (valor === '') { this.dom.mostrar_exito_campo('id_site'); return true; }
        if (!this.validations.format('id_site', '^[0-9]+$')) {
            this.dom.mostrar_error_campo('id_site', 'id_site_format_KO');
            return 'id_site_format_KO';
        }
        this.dom.mostrar_exito_campo('id_site');
        return true;
    }

    SEARCH_site_latitud_validation() {
        const valor = document.getElementById('site_latitud').value;
        if (valor === '') { this.dom.mostrar_exito_campo('site_latitud'); return true; }
        if (!this.validations.format('site_latitud', '^-?[0-9]{0,3}(\\.[0-9]{0,6})?$')) {
            this.dom.mostrar_error_campo('site_latitud', 'site_latitud_format_KO');
            return 'site_latitud_format_KO';
        }
        this.dom.mostrar_exito_campo('site_latitud');
        return true;
    }

    SEARCH_site_longitud_validation() {
        const valor = document.getElementById('site_longitud').value;
        if (valor === '') { this.dom.mostrar_exito_campo('site_longitud'); return true; }
        if (!this.validations.format('site_longitud', '^-?[0-9]{0,3}(\\.[0-9]{0,6})?$')) {
            this.dom.mostrar_error_campo('site_longitud', 'site_longitud_format_KO');
            return 'site_longitud_format_KO';
        }
        this.dom.mostrar_exito_campo('site_longitud');
        return true;
    }

    SEARCH_site_altitude_validation() {
        const valor = document.getElementById('site_altitude').value;
        if (valor === '') { this.dom.mostrar_exito_campo('site_altitude'); return true; }
        if (!this.validations.format('site_altitude', '^-?[0-9]{0,4}$')) {
            this.dom.mostrar_error_campo('site_altitude', 'site_altitude_format_KO');
            return 'site_altitude_format_KO';
        }
        this.dom.mostrar_exito_campo('site_altitude');
        return true;
    }

    SEARCH_site_locality_validation() {
        const valor = document.getElementById('site_locality').value;
        if (valor === '') { this.dom.mostrar_exito_campo('site_locality'); return true; }
        if (!this.validations.format('site_locality', "^[A-Za-zÁÉÍÓÚÜÑáéíóúüñ -]*$")) {
            this.dom.mostrar_error_campo('site_locality', 'site_locality_format_KO');
            return 'site_locality_format_KO';
        }
        this.dom.mostrar_exito_campo('site_locality');
        return true;
    }

    SEARCH_site_provider_login_validation() {
        const valor = document.getElementById('site_provider_login').value;
        if (valor === '') { this.dom.mostrar_exito_campo('site_provider_login'); return true; }
        if (!this.validations.format('site_provider_login', '^[A-Za-z0-9_-]*$')) {
            this.dom.mostrar_error_campo('site_provider_login', 'site_provider_login_format_KO');
            return 'site_provider_login_format_KO';
        }
        this.dom.mostrar_exito_campo('site_provider_login');
        return true;
    }

    SEARCH_site_north_photo_validation() { this.dom.mostrar_exito_campo('site_north_photo'); return true; }
    SEARCH_site_south_photo_validation() { this.dom.mostrar_exito_campo('site_south_photo'); return true; }
    SEARCH_site_east_photo_validation() { this.dom.mostrar_exito_campo('site_east_photo'); return true; }
    SEARCH_site_west_photo_validation() { this.dom.mostrar_exito_campo('site_west_photo'); return true; }
    SEARCH_nuevo_site_north_photo_validation() { return true; }
    SEARCH_nuevo_site_south_photo_validation() { return true; }
    SEARCH_nuevo_site_east_photo_validation() { return true; }
    SEARCH_nuevo_site_west_photo_validation() { return true; }

    ADD_submit_ubicacion() {
        let result = (
            this.ADD_id_site_validation() &
            this.ADD_site_latitud_validation() &
            this.ADD_site_longitud_validation() &
            this.ADD_site_altitude_validation() &
            this.ADD_site_locality_validation() &
            this.ADD_site_provider_login_validation() &
            this.ADD_nuevo_site_north_photo_validation() &
            this.ADD_nuevo_site_south_photo_validation() &
            this.ADD_nuevo_site_east_photo_validation() &
            this.ADD_nuevo_site_west_photo_validation()
        );
        return Boolean(result);
    }

    EDIT_submit_ubicacion() {
        let result = (
            this.EDIT_site_latitud_validation() &
            this.EDIT_site_longitud_validation() &
            this.EDIT_site_altitude_validation() &
            this.EDIT_site_locality_validation() &
            this.EDIT_site_provider_login_validation() &
            this.EDIT_nuevo_site_north_photo_validation() &
            this.EDIT_nuevo_site_south_photo_validation() &
            this.EDIT_nuevo_site_east_photo_validation() &
            this.EDIT_nuevo_site_west_photo_validation()
        );
        return Boolean(result);
    }

    SEARCH_submit_ubicacion() {
        let result = (
            this.SEARCH_id_site_validation() &
            this.SEARCH_site_latitud_validation() &
            this.SEARCH_site_longitud_validation() &
            this.SEARCH_site_altitude_validation() &
            this.SEARCH_site_locality_validation() &
            this.SEARCH_site_provider_login_validation()
        );
        return Boolean(result);
    }

    validar_fichero_imagen(id, errorExistencia, errorTipo, errorTamanyo, errorNombre) {
        if (!this.validations.not_exist_file(id)) {
            this.dom.mostrar_error_campo(id, errorExistencia);
            return errorExistencia;
        }
        if (!this.validations.type_file(id, ['image/jpeg', 'image/png'])) {
            this.dom.mostrar_error_campo(id, errorTipo);
            return errorTipo;
        }
        if (!this.validations.max_size_file(id, 5 * 1024 * 1024)) {
            this.dom.mostrar_error_campo(id, errorTamanyo);
            return errorTamanyo;
        }
        if (!this.validations.format_name_file(id, '^[A-Za-z0-9_.-]+$')) {
            this.dom.mostrar_error_campo(id, errorNombre);
            return errorNombre;
        }
        this.dom.mostrar_exito_campo(id);
        return true;
    }

    validar_fichero_opcional(id, errorTipo, errorTamanyo, errorNombre) {
        if (!this.validations.not_exist_file(id)) {
            this.dom.mostrar_exito_campo(id);
            return true;
        }
        if (!this.validations.type_file(id, ['image/jpeg', 'image/png'])) {
            this.dom.mostrar_error_campo(id, errorTipo);
            return errorTipo;
        }
        if (!this.validations.max_size_file(id, 5 * 1024 * 1024)) {
            this.dom.mostrar_error_campo(id, errorTamanyo);
            return errorTamanyo;
        }
        if (!this.validations.format_name_file(id, '^[A-Za-z0-9_.-]+$')) {
            this.dom.mostrar_error_campo(id, errorNombre);
            return errorNombre;
        }
        this.dom.mostrar_exito_campo(id);
        return true;
    }
}
