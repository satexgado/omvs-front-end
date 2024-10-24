export class ItemSelectHelper{

    protected _selectedItems = new Set();
    get selectedItemsNumber() {
        return this._selectedItems.size
    }

    get selectedItem()
    {
        return <[]> Array.from(this._selectedItems);
    }

    hasSelectedItem(item: any): boolean
    {
        return this._selectedItems.has(item);
    }

    isAllItemSelected(dataSize) {
        return dataSize <= this._selectedItems.size;
    }

    addSelectedItem(index: any[] | any) {
        if(index instanceof Array){
            if(index.length) {
              return index.forEach((element) =>{
                this._selectedItems.add(element);
              })
            }
            return ;
        }
        return this._selectedItems.add(index);
    }

    removeSelectedItem(index: any) {
        this._selectedItems.delete(index);
    }

    toggleSelectedItem(index: any) {
        if(this.hasSelectedItem(index))
        {
          this._selectedItems.delete(index);
        } else {
          this._selectedItems.add(index);
        }
    }

    clearSelection()
    {
        this._selectedItems.clear();
    }
}
