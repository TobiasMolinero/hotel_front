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
        title: 'alert-title',
        htmlContainer: 'alert-text',
        confirmButton: 'alert-button',
        cancelButton: 'alert-button',
        denyButton: 'alert-button'
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
        title: 'alert-title',
        htmlContainer: 'alert-text',
        confirmButton: 'alert-button',
        cancelButton: 'alert-button',
        denyButton: 'alert-button'
    },
    padding: '10px'
})

export const error = Swal.mixin({
    icon: 'error',
    showConfirmButton: true,
    confirmButtonColor: '#020120',
    confirmButtonText: 'Continuar',
    timer: 3000,
    timerProgressBar: true,
    customClass: {
        title: 'alert-title',
        htmlContainer: 'alert-text',
        confirmButton: 'alert-button',
        cancelButton: 'alert-button',
        denyButton: 'alert-button'
    },
    padding: '10px'
})

export const warning =  Swal.mixin({
    icon: 'warning',
    showConfirmButton: true,
    confirmButtonColor: '#020120',
    confirmButtonText: 'Continuar',
    timer: 3000,
    timerProgressBar: true,
    customClass: {
        title: 'alert-title',
        htmlContainer: 'alert-text',
        confirmButton: 'alert-button',
        cancelButton: 'alert-button',
        denyButton: 'alert-button'
    },
    padding: '10px'
})