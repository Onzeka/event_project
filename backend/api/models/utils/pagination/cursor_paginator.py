class CursorPaginator:

    def __init__(self,page_size:int,direction:str,order_by:str,cursor:dict,model) -> None:
        self.page_size = page_size
        self.direction = direction
        self.order_by = order_by
        self.cursor = cursor
        self.model = model
        self.reached_end = False
    
    def get_paginated_result(self,query):
        cursor_conditions = self._create_cursor_conditions()
        order = self._create_order()
        data = query.where(*cursor_conditions).order_by(order,self.model.id).limit(self.page_size+1).all()
        
        if len(data) > self.page_size:
            next_cursor = data.pop()
            self._set_cursor(next_cursor)
            self.reached_end = False
        else:
            self.reached_end = True
        return data

    def _create_order(self):
            order_col = getattr(self.model,self.order_by)
            return order_col.asc() if self.direction == 'asc' else order_col.desc()

    def _create_cursor_conditions(self):
        if self.cursor == None:
            conditions = []
        else:
            if self.direction == "asc":
                conditions = [getattr(self.model,col_name)>=value for col_name,value in self.cursor.items()]
            elif self.direction == "desc":
                conditions = [getattr(self.model,col_name)<=value for col_name,value in self.cursor.items()]
        return conditions

    def _set_cursor(self,next_cursor):
        self.cursor = {
            self.order_by : getattr(next_cursor,self.order_by),
            'id' : next_cursor.id
            }
        
