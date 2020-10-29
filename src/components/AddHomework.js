import React from "react";

export default function AddHomework() {
  return (
    <div className="card mx-2 my-2">
      <form className="mx-2 my-2" align="left">
        <div className="row">
          <div className="col form-group">
            <label htmlFor="formControlInputTeacher">Nombre profesor</label>
            <input
              type="text"
              className="form-control"
              id="formControlInputTeacher"
              placeholder="profesor"
            />
          </div>
          <div className="col form-group">
            <label htmlFor="formControlInputTitle">Título</label>
            <input
              type="text"
              className="form-control"
              id="FormControlInputTitle"
              placeholder="Título"
            />
          </div>
        </div>
        <div className="form-group">
          <label htmlFor="formControlInputCourse">Curso</label>
          <input
            type="email"
            className="form-control"
            id="FormControlInputCourse"
            placeholder="Curso"
          />
        </div>
        <div className="form-group">
          <label htmlFor="formControlSelect1">Materia</label>
          <select className="form-control" id="formControlSelect1">
            <option>1</option>
            <option>2</option>
            <option>3</option>
            <option>4</option>
            <option>5</option>
          </select>
        </div>
        <div className="form-group">
          <label htmlFor="formControlSelect2">Example multiple select</label>
          <select multiple className="form-control" id="formControlSelect2">
            <option>1</option>
            <option>2</option>
            <option>3</option>
            <option>4</option>
            <option>5</option>
          </select>
        </div>
        <div className="form-group">
          <label htmlFor="formControlTextarea1">Example textarea</label>
          <textarea
            className="form-control"
            id="formControlTextarea1"
            rows="3"
          ></textarea>
        </div>
      </form>
    </div>
  );
}
