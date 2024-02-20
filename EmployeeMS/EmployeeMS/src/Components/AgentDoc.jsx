import { Agenda, Day, Inject, Month, ScheduleComponent, Week, WorkWeek } from '@syncfusion/ej2-react-schedule'
import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { DropDownListComponent } from '@syncfusion/ej2-react-dropdowns'
import { DateTimePickerComponent } from '@syncfusion/ej2-react-calendars'

const AgentDoc = () => {
  const { id, agent_id } = useParams()
  
  const navigate = useNavigate();
  const [appointments, setAppointments] = useState([]);
  const [startHour, setStartHour] = useState();
  const [endHour, setEndHour] = useState();
  const [dataLoaded, setDataLoaded] = useState(false);

  useEffect(() => {
    console.log(id+agent_id)
    // Fetch appointments for the specific agent from the database
    fetchAppointments();
    setDataLoaded(true); // Set dataLoaded to true after data is fetched

  }, []);




  function convertTimeFormat(timeString) {
    const [hours, minutes, seconds] = timeString.split(':');
    const formattedTime = `${hours}:${minutes}`;
    return formattedTime;
  }
  const fetchAppointments = async () => {
    await axios.get('http://localhost:3000/employee/work_hours/' + agent_id)
      .then(result => {
        console.log(result.data.Result[0])
        setStartHour(convertTimeFormat(result.data.Result[0].startHour))
        setEndHour(convertTimeFormat(result.data.Result[0].endHour))

      })
      .catch(err => console.log(err))
    await axios.get('http://localhost:3000/employee/appointments/' + agent_id)
      .then(result => {
        if (result.data.Status) {
          console.log(result.data.Result)
          setAppointments(result.data.Result)

        }
        else {
          alert(result.data.Error)
        }
      }
      )
      .catch(err => console.log(err))

  };
  function convertLocalToUtc(localDateTime) {
    const localDate = new Date(localDateTime);
    const utcDate = new Date(localDate.getTime() - localDate.getTimezoneOffset() * 60000);
    return utcDate.toISOString();
  }
  const actionComplete = (args) => {
    console.log(args.requestType)
    if (args.requestType === 'eventCreated' && args.data) {
      console.log(args.data[0])

      const postData = {
        agent_id: agent_id,
        employee_id: id,
        Name: args.data[0].Name,
        Email: args.data[0].Email,
        Subject: args.data[0].Subject,
        StartTime: convertLocalToUtc(args.data[0].StartTime),
        EndTime: convertLocalToUtc(args.data[0].EndTime),
        Comments: args.data[0].Comments,
      };

      // Save the new appointment to the database
      axios.post(`http://localhost:3000/employee/set_appointment`, postData)
        .then(result => console.log(result))
        .catch(err => console.log(err))


      //setAppointments([...appointments, data]);

    }
    else if (args.requestType === 'eventChanged' && args.data) {
      console.log(args.data[0].id)

      const postData = {
        id: args.data[0].id,
        agent_id: agent_id,
        employee_id: id,
        Name: args.data[0].Name,
        Email: args.data[0].Email,
        Subject: args.data[0].Subject,
        StartTime: convertLocalToUtc(args.data[0].StartTime),
        EndTime: convertLocalToUtc(args.data[0].EndTime),
        Comments: args.data[0].Comments,
      };
      axios.put(`http://localhost:3000/employee/edit_appointment`, postData)
        .then(result => console.log(result))
        .catch(err => console.log(err))

      window.location.reload();

    }else if (args.requestType === 'eventRemoved' && args.data)
    {
      axios.delete(`http://localhost:3000/employee/delete_appointment/`+args.data[0].id)
      .then(result=>console.log(result))
      .catch(err=>console.log(err))
      window.location.reload()
    }
  };

  const editorTemplate = (props) => {
    

    return (
      <table className='costum-event-editor' style={{ width: '100%', height: '50%' }}><tbody>
        <tr>
          <td className='e-textlabel'>Name Of client</td>
          <td><input className="e-field" id='Name' name='Name' type='text' style={{ width: '100%' }} required /></td>
        </tr>
        <tr>
          <td className='e-textlabel'>Email</td>
          <td><input className="e-field" id='Email' name='Email' type='email' style={{ width: '100%' }} required /></td>
        </tr>
        <tr>
          <td className='e-textlabel'>Subject</td>
          <td>
            <DropDownListComponent
              id="EventType"
              className="e-field"
              data-name="Subject"
              value={props.Subject || null}
              dataSource={['POS', 'Referral', 'Response Card', 'Veterans']}
              placeholder='Choose Type'
              style={{ width: '100%' }}
              required
            >

            </DropDownListComponent>
          </td>
        </tr>
        <tr>
          <td className='e-textlabel'>From:</td>
          <td>
            <DateTimePickerComponent
              className="e-field"
              value={new Date(props.startTime || props.StartTime)}
              id='StartTime' data-name='StartTime'
              format='MM/dd/yyyy HH:mm'
              required>

            </DateTimePickerComponent>
          </td>
        </tr>
        <tr>
          <td className='e-textlabel'>To:</td>
          <td>
            <DateTimePickerComponent
              className="e-field"
              value={new Date(props.endTime || props.EndTime)}

              id='EndTime'
              data-name='EndTime'
              format='MM/dd/yyyy HH:mm'>


            </DateTimePickerComponent>
          </td>
        </tr>
        <tr>
          <td className='e-textlabel'>Comments</td>
          <td>
            <textarea
              className="e-field"
              id='Comments' name='Comments'
              rows={3} cols={50}
              style={{ width: '100%', height: '60px', resize: 'vertical' }}></textarea>
          </td>
        </tr>
      </tbody>
      </table>
    )
  };
  if (!dataLoaded) {
    return(
    <div class="text-center">
      <div class="spinner-border" role="status">
        <span class="visually-hidden">Loading...</span>
      </div>
    </div>
    )
  }
  return (
    <div>
      <ScheduleComponent
      rowAutoHeight={true}
        showQuickInfo={false}
        selectedDate={new Date()}
        eventSettings={{
          dataSource: appointments,
          editFollowingEvents: true, // Allows editing of following events
        }}
        actionComplete={actionComplete}
        editorTemplate={editorTemplate}
        startHour={startHour} endHour={endHour}

      >
        <Inject services={[Day, Week, Month, Agenda]} />
      </ScheduleComponent>
    </div>
  );
}

export default AgentDoc