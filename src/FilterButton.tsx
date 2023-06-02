import React, {memo, useCallback} from 'react';
import {Button} from "@mui/material";

type FilterButtonType = {
    name: 'All' | 'Active' | 'Completed'
    variant: 'contained' | 'text'
    color: 'inherit' | 'primary' | 'secondary'
    changeFilter: () => void
}

export const FilterButton = memo((props: FilterButtonType) => {
    console.log('FilterButton');

    const onChangeFilter = useCallback(() => {
        props.changeFilter();
    }, [props.changeFilter])

    return (
        <Button variant={props.variant}
                color={props.color}
                onClick={onChangeFilter}>
            {props.name}
        </Button>
    );
});
