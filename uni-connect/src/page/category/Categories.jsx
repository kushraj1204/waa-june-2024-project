import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import InfiniteScroll from 'react-infinite-scroll-component';
import { AiOutlineArrowUp, AiOutlineEdit, AiOutlineDelete } from 'react-icons/ai';

import { apiFetchCategories, apiCreateCateogry, apiUpdateCategory, apiDeleteCategory } from '../../action/ApiActions';
import AsideLeft from '../../component/AsideLeft';
import MobileNavBar from '../../component/MobileNavBar';
import { AsideRight } from '../../component/AsideRight';
import ConfirmDelete from '../common/ConfirmDelete';
import CategoryPopup from './CategoryPopup';

const Categories = () => {
  const [categories, setCategories] = useState([]);
  const [page, setPage] = useState(0);
  const [keyword, setKeyword] = useState("");
  const [hasMore, setHasMore] = useState(false);
  const [showPopup, setShowPopup] = useState(false);
  const [showConfirmDelete, setShowConfirmDelete] = useState(false);
  const [editCategory, setEditCategory] = useState(null);
  const [deleteCategoryId, setDeleteCategoryId] = useState(null);
  const navigate = useNavigate();

  const onEnter = (e) => {
    setKeyword(e.target.value);
    setCategories([]);
    setPage(0);
    fetchCategories(e.target.value, 0);
  };

  const fetchCategories = async (key = keyword, currentPage = page) => {
    setPage(currentPage + 1);
    const response = await apiFetchCategories({ keyword: key, size: 7, page: currentPage + 1 });
    if (response.status) {
      setCategories(prevItems => currentPage === 0 ? response.data.content : [...prevItems, ...response.data.content]);
      setHasMore(!response.data.last);
    } else {
      toast.error(response.message);
    }
  };

  useEffect(() => {
    if (categories.length === 0) {
      fetchCategories();
    }
  }, []);

  const handleSave = async (title) => {
    try {
      const response = editCategory 
        ? await apiUpdateCategory(editCategory.id, { title })
        : await apiCreateCateogry({ title });

      if (response.status) {
        toast.success(`Category ${editCategory ? 'updated' : 'created'} successfully`);
        fetchCategories(keyword, 0);
      } else {
        toast.error(response.message);
      }
    } catch (error) {
      toast.error('An error occurred. Please try again.');
    }
    setShowPopup(false);
  };

  const handleDelete = async () => {
    try {
      const response = await apiDeleteCategory(deleteCategoryId);

      if (response.status) {
        toast.success('Category deleted successfully');
        fetchCategories(keyword, 0);
      } else {
        toast.error(response.message);
      }
    } catch (error) {
      toast.error('An error occurred. Please try again.');
    }
    setShowConfirmDelete(false);
  };

  return (
    <div className="container mx-auto p-4">
      <MobileNavBar />

      <div className="flex justify-center px-4 sm:px-20 md:mt-4">
        <div className="flex h-full w-full">
          <AsideLeft />

          <main className="md:mx-4 w-full sm:basis-2/3">
            <h1 className="text-2xl font-bold mb-4">Categories</h1>

            <button 
              onClick={() => { setShowPopup(true); setEditCategory(null); }} 
              className="block mb-4 text-blue-500 hover:text-blue-700 font-semibold"
            >
              + Create Category
            </button>

            <InfiniteScroll
              dataLength={categories.length}
              next={fetchCategories}
              hasMore={hasMore}
              loader={<h4>Loading...</h4>}
              className="space-y-3"
            >
              {categories.map((category) => (
                <div key={category.id} className="bg-white shadow-md rounded-md p-4 hover:bg-gray-100 transition duration-200 flex justify-between items-center">
                  <button
                    onClick={() => navigate(`/category/${category.id}/questions`)}
                    className="text-lg font-medium text-blue-600 hover:underline flex-grow text-left"
                  >
                    {category.title}
                  </button>

                  <div className="flex space-x-2">
                    <AiOutlineEdit
                      onClick={() => { setShowPopup(true); setEditCategory(category); }}
                      className="text-gray-600 hover:text-blue-600 cursor-pointer"
                    />
                    <AiOutlineDelete
                      onClick={() => { setShowConfirmDelete(true); setDeleteCategoryId(category.id); }}
                      className="text-gray-600 hover:text-red-600 cursor-pointer"
                    />
                  </div>
                </div>
              ))}
            </InfiniteScroll>
          </main>

          <AsideRight onEnter={onEnter} />
          <a href="#">
            <AiOutlineArrowUp className="fixed bottom-4 right-4 bg-blue-500 text-white text-3xl p-2 rounded-full hover:bg-blue-600" />
          </a>
        </div>
      </div>

      <CategoryPopup
        show={showPopup}
        onClose={() => setShowPopup(false)}
        onSave={handleSave}
        initialTitle={editCategory ? editCategory.title : ''}
      />

      <ConfirmDelete
        show={showConfirmDelete}
        onClose={() => setShowConfirmDelete(false)}
        onConfirm={handleDelete}
      />
    </div>
  );
};

export default Categories;
