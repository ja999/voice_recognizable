Rails.application.routes.draw do
  root 'pages#home'
  post :register, to: 'pages#register'
  post :login, to: 'pages#login'
  resources :users
end
