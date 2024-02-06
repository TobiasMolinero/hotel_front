/* eslint-disable no-unused-vars */
import Swal from 'sweetalert2';
import '../css/alertas.css';

export const success = Swal.mixin({
    icon: 'success',
    showConfirmButton: true,
    confirmButtonText: 'Continuar',
    confirmButtonColor: '#020120',
    showCancelButton: false,
    showCloseButton: true,
    reverseButtons: true,
    timer: 3000,
    timerProgressBar: true,
    focusConfirm: false,
    focusCancel: false,
    customClass: {
        title: 'title',
        htmlContainer: 'text',
        confirmButton: 'button',
        cancelButton: 'button',
        denyButton: 'button'
    },
    padding: '10px'
});

export const confirmar = Swal.mixin({
    icon: 'question',
    showCancelButton: true,
    cancelButtonColor: '#bbb',
    cancelButtonText: 'Cancelar',
    showConfirmButton: true,
    confirmButtonColor: '#020120',
    confirmButtonText: 'Confirmar',
    reverseButtons: true,
    customClass: {
        title: 'itle',
        htmlContainer: 'text',
        confirmButton: 'button',
        cancelButton: 'button',
        denyButton: 'button'
    },
    padding: '10px'
})