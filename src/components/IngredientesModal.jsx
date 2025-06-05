import React, { Fragment } from "react";
import {
  Dialog,
  Transition,
  TransitionChild,
  DialogPanel,
  DialogTitle,
} from "@headlessui/react";
import { XMarkIcon } from "@heroicons/react/24/outline";
import { Formik, Form } from "formik";
import toast from "react-hot-toast";

const IngredientesModal = ({
  isOpen = false,
  toggle,
  handleChangePadre,
  valueOld,
}) => {
  const agregarRegistro = (registrosNuevos) => {
    const registrosAnteriores = valueOld;
    let registrosNew = [...registrosAnteriores];
    registrosNew.push(registrosNuevos);
    // console.log("registrosNew", registrosNew);
    //Aqui se agrega el registro al value y se actualiza el state con handleChanche del formik
    handleChangePadre({
      target: {
        name: "ingredientes",
        value: registrosNew,
      },
    });
    toast.success("Ingrediente agregado correctamente");
    toggle(false);
  };

  const validateErrors = (values) => {
    const errors = {};
    if (!values.nombre) {
      errors.nombre = "Nombre del ingrediente es requerido";
    }
    if (!values.cantidadPorcion || values.cantidadPorcion <= 0) {
      errors.cantidadPorcion = "Cantidad de porción es requerida y debe ser mayor a 0";
    }
    if (!values.tipoCoccion) {
      errors.tipoCoccion = "Tipo de cocción es requerido";
    }
    if (!values.tiempoCoccion || values.tiempoCoccion <= 0) {
      errors.tiempoCoccion = "Tiempo de cocción es requerido y debe ser mayor a 0";
    }
    if (!values.indicaciones) {
      errors.indicaciones = "Indicaciones son requeridas";
    }
    return errors;
  };

  return (
    <Transition show={isOpen} as={Fragment}>
      <Dialog as="div" className="relative" open={isOpen} onClose={() => {}}>
        <div className="fixed" />
        <TransitionChild
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0">
          <div className="fixed inset-0 bg-gray-600 bg-opacity-75 transition-opacity" />
        </TransitionChild>

        <div className="fixed z-10 inset-0 overflow-y-auto">
          <div className="flex items-center justify-center min-h-full min-w-full p-2 text-center">
            <TransitionChild
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
              enterTo="opacity-100 translate-y-0 sm:scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 translate-y-0 sm:scale-100"
              leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95">
              <DialogPanel
                className={`flex-grow relative bg-white rounded-lg sm:mx-24 md:mx-48 lg:mx-72 xl:mx-96 p-4 text-left overflow-hidden shadow-xl transform transition-all my-8 w-auto`}>
                <div className="absolute top-0 right-0 pt-4 pr-4">
                  <button
                    type="button"
                    className="rounded-md bg-white text-gray-400 hover:text-gray-500 focus:outline-none"
                    onClick={() => toggle(false)}>
                    <span className="sr-only">Close</span>
                    <XMarkIcon className="h-6 w-6" aria-hidden="true" />
                  </button>
                </div>
                <div className="space-y-6 px-2 w-full">
                  {/* Formulario de ingrendientes individuales */}

                  <Formik
                    initialValues={{
                      nombre: "",
                      cantidadPorcion: 0,
                      tipoCoccion: "",
                      tiempoCoccion: 0,
                      indicaciones: "",
                    }}
                    validate={validateErrors}
                    onSubmit={(values) => {
                      agregarRegistro(values);
                    }}>
                    {({ handleChange, values, errors, isSubmitting }) => (
                      <Form className="flex flex-col w-full space-y-4 justify-center">
                        <label className="block text-xl font-bold text-gray-700">
                          Detalle de los ingredientes
                        </label>

                        <div className="flex flex-col">
                          <label className="text-sm font-medium text-gray-700">
                            Nombre de Ingredientes
                          </label>
                          <input
                            name={"nombre"}
                            placeholder="Nombre del ingrediente"
                            value={values.cantidadIngredientes}
                            onChange={handleChange}
                            className="flex-1 border rounded px-2 py-1"
                          />
                          {errors.nombre && (
                            <p className="text-red-500 text-sm">
                              {errors.nombre}
                            </p>
                          )}
                        </div>
                        <div className="flex flex-col">
                          <label className="text-sm font-medium text-gray-700">
                            Cantidad de porción (gramos)
                          </label>
                          <input
                            name={"cantidadPorcion"}
                            placeholder="Cantidad de porción"
                            value={values.cantidadPorcion}
                            onChange={handleChange}
                            className="flex-1 border rounded px-2 py-1"
                          />
                          {errors.cantidadPorcion && (
                            <p className="text-red-500 text-sm">
                              {errors.cantidadPorcion}
                            </p>
                          )}
                        </div>

                        {/* Tipo cocción */}
                        <div className="flex flex-col">
                          <label className="text-sm font-medium text-gray-700">
                            Tipo de cocción
                          </label>
                          <select
                            name={"tipoCoccion"}
                            value={values.tipoCoccion}
                            onChange={handleChange}
                            className="flex-1 border rounded px-2 py-1">
                            <option value="">Seleccione un tipo</option>
                            <option value="frito">Frito</option>
                            <option value="hervido">Hervido</option>
                            <option value="asado">Asado</option>
                          </select>
                          {errors.tipoCoccion && (
                            <p className="text-red-500 text-sm">
                              {errors.tipoCoccion}
                            </p>
                          )}
                        </div>

                        {/* Tiempo de coccion */}
                        <div className="flex flex-col">
                          <label className="text-sm font-medium text-gray-700">
                            Tiempo de cocción (minutos)
                          </label>
                          <input
                            type="number"
                            name={"tiempoCoccion"}
                            placeholder="Tiempo de cocción"
                            value={values.tiempoCoccion}
                            onChange={handleChange}
                            className="flex-1 border rounded px-2 py-1"
                          />
                          {errors.tiempoCoccion && (
                            <p className="text-red-500 text-sm">
                              {errors.tiempoCoccion}
                            </p>
                          )}
                        </div>

                        {/* Indicaciones */}
                        <div className="flex flex-col">
                          <label className="text-sm font-medium text-gray-700">
                            Indicaciones
                          </label>
                          <textarea
                            name={"indicaciones"}
                            placeholder="Indicaciones"
                            value={values.indicaciones}
                            onChange={handleChange}
                            className="flex-1 border rounded px-2 py-1"
                            rows="3"
                          />
                          {errors.indicaciones && (
                            <p className="text-red-500 text-sm">
                              {errors.indicaciones}
                            </p>
                          )}
                        </div>

                        <div className="flex w-full px-2 space-x-2">
                          <button
                            type="button"
                            disabled={isSubmitting}
                            onClick={() => {
                              toggle(false);
                            }}
                            className="bg-red-500 text-white px-4 py-2 rounded">
                            Cancelar
                          </button>
                          <button
                            type="submit"
                            disabled={isSubmitting}
                            className="bg-green-500 text-white px-4 py-2 rounded">
                            {isSubmitting ? "Agregando..." : "Agregar"}
                          </button>
                        </div>
                      </Form>
                    )}
                  </Formik>
                </div>
              </DialogPanel>
            </TransitionChild>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
};

export default IngredientesModal;
