import {useState} from 'react';
import Wrapper from '../../components/Forms/Sign-up/FormWrapper';
import SignupForm1 from '../../components/Forms/Sign-up/FormStep1';
import SignupForm2 from '../../components/Forms/Sign-up/FormStep2';
import SignupForm3 from '../../components/Forms/Sign-up/FormStep3';

export default function SignupPage() {
  const [step, setStep] = useState(1);
  const [userId, setUserId] = useState('');
  if (step === 1) {
    return (
      <Wrapper step={step} title='Create an account'>
        <SignupForm1 changeStep={() => setStep(2)} setUserId={setUserId} />
      </Wrapper>
    )
  }
  if (step === 2) {
    return (
      <Wrapper step={step} title='Submit email' >
        <SignupForm2 changeStep={() => setStep(3)} userId={userId} />
      </Wrapper>
      
    )
  }
  if (step === 3) {
    return (
      <Wrapper step={step} title='Add additional information' >
        <SignupForm3 userId={userId} />
      </Wrapper>
    )
  }
}