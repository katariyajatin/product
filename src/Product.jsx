import { useFormik } from 'formik'
import React, { useEffect, useState } from 'react'
import * as Yup from 'yup';

const Product = () => {
  
  const [rec,setrec] = useState('');

  // localStorage.clear()

  // console.log(ldata)

  function localdataget(){
    var ldata = JSON.parse(localStorage.getItem('formdata'));
    if(ldata==null)
    {
      localStorage.setItem('formdata',JSON.stringify(''));
    }
    setrec(ldata)
  }

  useEffect(()=>{
    localdataget()
  },[])

  var obj = {
    name: '',
    email: '',
    password: ''
  }

  const formik = new useFormik({
    initialValues: obj,
    validationSchema: Yup.object({
      name: Yup.string().required('please enter name').min(2, 'Enter minimum 2 character...'),
      email: Yup.string().email('enter valid email address').required('please enter email...'),
      password: Yup.string().required('please enter password').matches(/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/, 'enter valid password.'),
    }),
    onSubmit: values => {
        var dd =  JSON.parse(localStorage.getItem('formdata'));
        var data = [...dd,values];
        localStorage.setItem('formdata',JSON.stringify(data));
        localdataget()
    }
  })

  function cldata(){
    localStorage.removeItem('formdata');
    localdataget()
  }

  return (
    <div>

      <form onSubmit={formik.handleSubmit}>
        <table>
          <tbody>
            <tr>
              <td>Name</td>
              <td><input type="text" name="name" placeholder='Enter Name' value={formik.name} onChange={formik.handleChange} /></td>
              <td>
                {formik.errors.name ? <p>{formik.errors.name}</p> : ''}
              </td>
            </tr>
            <tr>
              <td>Email</td>
              <td><input type="email" name="email" placeholder='Enter Email' value={formik.email} onChange={formik.handleChange} /></td>
              <td>
                {formik.errors.email ? <p>{formik.errors.email}</p> : ''}
              </td>
            </tr>
            <tr>
              <td>Password</td>
              <td><input type="password" name="password" placeholder='Enter Password' value={formik.password} onChange={formik.handleChange} /></td>
              <td>
                {formik.errors.password ? <p>{formik.errors.password}</p> : ''}
              </td>
            </tr>
            <tr>
              <td colSpan={2} align='center'><input type="submit" value={'Submit'} /></td>
              <td colSpan={2} align='center'><input type="button" value={'Clear All Data'} onClick={cldata} /></td>
            </tr>
          </tbody>
        </table>
      </form>

      <hr />

      <table>
        <thead>
          <tr>
            <th>No</th>
            <th>Name</th>
            <th>email</th>
            <th>password</th>
          </tr>
        </thead>
        <tbody>
          {
            rec && rec.map((v,i)=>{
              return(
                <tr key={i}>
                  <td>{i+1}</td>
                  <td>{v.name}</td>
                  <td>{v.email}</td>
                  <td>{v.password}</td>
                </tr>
              )
            })
          }
        </tbody>
      </table>

    </div>
  )
}

export default Product