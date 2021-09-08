import { useDispatch } from 'react-redux';
import { bindActionCreators } from 'redux';
import { allActions, allOperations } from '../store/actions';

export const useActions = () => {
    const dispatch = useDispatch();
    return bindActionCreators({ ...allActions, ...allOperations }, dispatch);
};