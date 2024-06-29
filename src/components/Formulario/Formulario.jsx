import React, { useState, useEffect } from 'react';
import './Formulario.css';

const Formulario = ({ onSubmit, editingUser }) => {
  const initialFormData = {
    nombre: '',
    primerApellido: '',
    segundoApellido: '',
    email: '',
    estado: '',
    delegacion: '',
    colonia: '',
    curp: '',
    rfc: '',
    codigoPostal: '',
    numeroExterior: '',
  };

  const [formData, setFormData] = useState(initialFormData);
  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (editingUser) {
      setFormData({
        nombre: editingUser.nombre || '',
        primerApellido: editingUser.primerApellido || '',
        segundoApellido: editingUser.segundoApellido || '',
        email: editingUser.email || '',
        estado: editingUser.estado || '',
        delegacion: editingUser.delegacion || '',
        colonia: editingUser.colonia || '',
        curp: editingUser.curp || '',
        rfc: editingUser.rfc || '',
        codigoPostal: editingUser.codigoPostal || '',
        numeroExterior: editingUser.numeroExterior || '',
      });
    } else {
      setFormData(initialFormData);
    }
  }, [editingUser]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const validateForm = () => {
    const newErrors = {};
    const lettersOnly = /^[A-Za-z\s]+$/;
    if (!lettersOnly.test(formData.nombre)) {
      newErrors.nombre = 'El nombre solo debe contener letras';
    }
    if (!lettersOnly.test(formData.primerApellido)) {
      newErrors.primerApellido = 'El primer apellido solo debe contener letras';
    }
    if (!lettersOnly.test(formData.segundoApellido)) {
      newErrors.segundoApellido = 'El segundo apellido solo debe contener letras';
    }
    if (!lettersOnly.test(formData.estado)) {
      newErrors.estado = 'El estado solo debe contener letras';
    }
    if (!lettersOnly.test(formData.delegacion)) {
      newErrors.delegacion = 'La delegación solo debe contener letras';
    }
    if (!lettersOnly.test(formData.colonia)) {
      newErrors.colonia = 'La colonia solo debe contener letras';
    }

    const curpRegex = /^([A-Z]{4}\d{6}[HM]{1}[A-Z]{5}[A-Z\d]{2})$/;
    if (!curpRegex.test(formData.curp)) {
      newErrors.curp = 'CURP inválida';
    }
    const rfcRegex = /^([A-ZÑ&]{3,4})\d{2}(0[1-9]|1[0-2])(0[1-9]|[1-2]\d|3[0-1])[A-Z\d]{3}$/;
    if (!rfcRegex.test(formData.rfc)) {
      newErrors.rfc = 'RFC inválido';
    }

    const numbersOnly = /^\d{5}$/;
    if (!numbersOnly.test(formData.codigoPostal)) {
      newErrors.codigoPostal = 'El código postal debe ser un número de 5 dígitos';
    }

    if (!numbersOnly.test(formData.numeroExterior)) {
      newErrors.numeroExterior = 'El número exterior debe ser un número de hasta 5 dígitos';
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      newErrors.email = 'Email inválido';
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return false;
    }
    setErrors({});
    return true;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      onSubmit(formData);
      setFormData(initialFormData); // Limpiar el formulario después de enviar los datos
    } else {
      alert('Existen campos por validar');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="formulario-banco">
      <div>
        <label>Nombre:</label>
        <input type="text" name="nombre" value={formData.nombre} onChange={handleChange} />
        {errors.nombre && <span className="error">{errors.nombre}</span>}
      </div>
      <div>
        <label>Primer Apellido:</label>
        <input type="text" name="primerApellido" value={formData.primerApellido} onChange={handleChange} />
        {errors.primerApellido && <span className="error">{errors.primerApellido}</span>}
      </div>
      <div>
        <label>Segundo Apellido:</label>
        <input type="text" name="segundoApellido" value={formData.segundoApellido} onChange={handleChange} />
        {errors.segundoApellido && <span className="error">{errors.segundoApellido}</span>}
      </div>
      <div>
        <label>Email:</label>
        <input type="email" name="email" value={formData.email} onChange={handleChange} />
        {errors.email && <span className="error">{errors.email}</span>}
      </div>
      <div>
        <label>Estado:</label>
        <input type="text" name="estado" value={formData.estado} onChange={handleChange} />
        {errors.estado && <span className="error">{errors.estado}</span>}
      </div>
      <div>
        <label>Delegación:</label>
        <input type="text" name="delegacion" value={formData.delegacion} onChange={handleChange} />
        {errors.delegacion && <span className="error">{errors.delegacion}</span>}
      </div>
      <div>
        <label>Colonia:</label>
        <input type="text" name="colonia" value={formData.colonia} onChange={handleChange} />
        {errors.colonia && <span className="error">{errors.colonia}</span>}
      </div>
      <div>
        <label>CURP:</label>
        <input type="text" name="curp" value={formData.curp} onChange={handleChange} />
        {errors.curp && <span className="error">{errors.curp}</span>}
      </div>
      <div>
        <label>RFC:</label>
        <input type="text" name="rfc" value={formData.rfc} onChange={handleChange} />
        {errors.rfc && <span className="error">{errors.rfc}</span>}
      </div>
      <div>
        <label>Código Postal:</label>
        <input type="text" name="codigoPostal" value={formData.codigoPostal} onChange={handleChange} />
        {errors.codigoPostal && <span className="error">{errors.codigoPostal}</span>}
      </div>
      <div>
        <label>Número Exterior:</label>
        <input type="text" name="numeroExterior" value={formData.numeroExterior} onChange={handleChange} />
        {errors.numeroExterior && <span className="error">{errors.numeroExterior}</span>}
      </div>
      <div>
        <button type="submit" className="btn-submit">Guardar</button>
      </div>
    </form>
  );
};

export default Formulario;